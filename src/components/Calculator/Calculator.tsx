import React, { Fragment, Component, MouseEvent } from 'react'

import Buttons from './CalculatorButtons'
import Alert from '../Alert/Alert'

class Calculator extends React.Component<{}, {}> {
    render() {
        return (
            <Fragment>
                <CalculatorBody />
            </Fragment>
        )
    }
}

interface CBState {
    currentValue: string[]
    expression: string[]
    hasErrors: boolean
    errorMessage: string
}

/** Calculator Body component. */
class CalculatorBody extends Component<{}, CBState> {
    private readonly operators: string[] = ['+', '-', '/', '*', '^']
    private multipleZeroPattern: RegExp = /(^[0]{1,})/gi
    private multipleDotPattern: RegExp = /([.]{2,})/gi
    private initialState: CBState = {
        currentValue: [],
        expression: [],
        hasErrors: false,
        errorMessage: '',
    }

    constructor() {
        // TODO: Read more about this error.
        // @ts-ignore
        super()
        this.state = this.initialState
        this.handleButtonsClick = this.handleButtonsClick.bind(this)
        this.handleClearClick = this.handleClearClick.bind(this)
        this.handleEqualsClick = this.handleEqualsClick.bind(this)
    }

    /** Event handler for all the buttons.
     * @param event Event.
     */
    handleButtonsClick = (event: MouseEvent<HTMLButtonElement>): void => {
        const target: HTMLButtonElement = event.target as HTMLButtonElement
        const { currentValue, expression } = this.state
        let val: string = target.value

        if (currentValue[currentValue.length - 1] === '.' && val === '.') {
            this.setState({
                currentValue: [...currentValue],
                expression: [...expression],
                hasErrors: true,
                errorMessage: 'Cannot have multiple decimal in a number!',
            })
        } else if (currentValue[0] === '0' && val === '0') {
            this.setState({
                currentValue: [...currentValue.slice(1), val],
                expression: [...expression.slice(1), val],
                hasErrors: true,
                errorMessage: 'Calculations cannot start with multiple zeroes!',
            })
        } else {
            this.setState({
                currentValue: [...currentValue, val],
                expression: [...expression, val],
                hasErrors: false,
                errorMessage: '',
            })
        }

        if (this.operators.includes(val)) {
            this.setState({
                // @ts-ignore
                expression: [...expression, target.attributes.operation.value],
            })
        }
    }

    /** Event handler for clear button which will reset the state. */
    handleClearClick = (): void => {
        this.setState(this.initialState)
    }

    /** Event handler for equals button which will evaluate the expresssion. */
    handleEqualsClick = (): void => {
        const { expression } = this.state
        if (expression.length) {
            // Remove all the leading zeroes.
            let exprStr: string = expression.join('').replace(this.multipleZeroPattern, '') || '0'

            this.setState({
                expression: [eval(exprStr)],
                currentValue: [eval(exprStr)],
                hasErrors: false,
                errorMessage: '',
            })
        }
    }

    render() {
        const { currentValue, expression, hasErrors, errorMessage } = this.state

        console.log(expression)

        return (
            <Fragment>
                <div className="calculator">
                    {/* {hasErrors && <Alert message={errorMessage} severity="warning" />} */}
                    <div id="display" className="calculator__display">
                        <p>{currentValue.length && currentValue}</p>
                    </div>
                    <div className="calculator__buttons">
                        <button
                            id="clear"
                            className="button is-danger is-medium"
                            onClick={this.handleClearClick}
                        >
                            Clear
                        </button>
                        <Buttons onClick={this.handleButtonsClick} />
                        <button
                            id="equals"
                            className="button is-success is-medium"
                            onClick={this.handleEqualsClick}
                        >
                            =
                        </button>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default Calculator
