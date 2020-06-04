import * as React from 'react'
import Buttons from './CalculatorButtons'

class Calculator extends React.Component<{}, {}> {
    render() {
        return (
            <React.Fragment>
                <CalculatorBody />
            </React.Fragment>
        )
    }
}

interface CBProps {}

interface CBState {
    currentValue: string[]
    expression: string[]
}

/** Calculator Body component. */
class CalculatorBody extends React.Component<CBProps, CBState> {
    constructor(props: CBProps) {
        super(props)
        this.state = {
            currentValue: [],
            expression: [],
        }

        this.handleButtonsClick = this.handleButtonsClick.bind(this)
        this.handleClearClick = this.handleClearClick.bind(this)
        this.handleEqualsClick = this.handleEqualsClick.bind(this)
    }

    /** Event handler for all the buttons.
     * @param event Event.
     */
    handleButtonsClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
        const validationPattern: RegExp = /([0]{2,})|([.]{2,})/gi
        const multipleDotPattern: RegExp = /([.]{2,})/gi
        const multipleZeroPattern: RegExp = /([0]{2,})/gi
        const operators: string[] = ['+', '-', '/', '*', '^', 'cos']
        const target: HTMLButtonElement = event.target as HTMLButtonElement
        let val: string = target.value
        const { currentValue, expression } = this.state
        const invalidCondition: boolean = (currentValue[currentValue.length - 1] === '.' && val === '.') || currentValue[0] === '0' || val === '0'

        if (invalidCondition) {
            this.setState({
                currentValue: [...currentValue],
                expression: [...expression],
            })
        } else {
            this.setState({
                currentValue: [...currentValue, val],
                expression: [...expression, val],
            })
        }

        if (operators.includes(val)) {
            this.setState({
                // @ts-ignore
                expression: [...expression, target.attributes.operation.value],
            })
        }
    }

    /** Event handler for clear button which will reset the state. */
    handleClearClick = () => {
        this.setState({
            expression: [],
            currentValue: [],
        })
    }

    /** Event handler for equals button which will evaluate
     * the expresssion.
     */
    handleEqualsClick = () => {
        const { expression } = this.state
        if (expression.length) {
            let exprStr = expression.join('') || '0'

            if (exprStr.indexOf('0') === 0) {
                exprStr = exprStr.slice(1)
            }

            this.setState({
                expression: [eval(exprStr)],
                currentValue: [eval(exprStr)],
            })
        }
    }

    render() {
        const { currentValue, expression } = this.state

        console.log(expression)

        return (
            <div className="calculator">
                <div id="display" className="calculator__display">
                    {currentValue.length && currentValue}
                </div>
                <div className="calculator__buttons">
                    <button id="clear" onClick={this.handleClearClick} className="button is-warning is-medium">
                        Clear
                    </button>
                    <Buttons onClick={this.handleButtonsClick} />
                    <button id="equals" onClick={this.handleEqualsClick} className="button is-success is-medium">
                        =
                    </button>
                </div>
            </div>
        )
    }
}

export default Calculator
