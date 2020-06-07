import React, { Fragment, Component, MouseEvent } from 'react'

import { NumberButtons, ActionButtons } from './CalculatorButtons'
// import Alert from '../Alert/Alert'

import { evaluate2 } from '../../utils/evaluate'

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
    currentValue: string
    expression: string
    hasErrors: boolean
    errorMessage: string
}

/** Calculator Body component. */
class CalculatorBody extends Component<{}, CBState> {
    private readonly operators: string[] = ['+', '-', '/', '*', '^']
    private multipleZeroPattern: RegExp = /(^[0]{1,})/gi
    private multipleDotPattern: RegExp = /([.]{2,})/gi
    private initialState: CBState = {
        currentValue: '',
        expression: '',
        hasErrors: false,
        errorMessage: '',
    }

    constructor() {
        // TODO: Read more about this error.
        // @ts-ignore
        super()
        this.state = this.initialState
        this.handleButtonsClick = this.handleButtonsClick.bind(this)
        this.handleActionClick = this.handleActionClick.bind(this)
        this.handleClearClick = this.handleClearClick.bind(this)
        this.handleEqualsClick = this.handleEqualsClick.bind(this)
    }

    /** Event handler for all the buttons.
     * @param event Event.
     */
    handleButtonsClick = (event: MouseEvent<HTMLButtonElement>): void => {
        const target: HTMLButtonElement = event.target as HTMLButtonElement
        const { currentValue, expression }: CBState = this.state
        const { value }: HTMLButtonElement = target

        let cleanStr = (str: string): string => {
            return str.replace(/^([^.]*\.)(.*)$/, (a, b, c): string => {
                return b + c.replace(/\./g, '')
            })
        }

        let currStr = cleanStr(currentValue.concat(value)).replace(this.multipleZeroPattern, '')

        this.setState({
            currentValue: currStr,
            expression: expression.concat(value),
        })
    }

    handleActionClick = (event: MouseEvent<HTMLButtonElement>): void => {
        const target: HTMLButtonElement = event.target as HTMLButtonElement
        const { value }: HTMLButtonElement = target
        const { currentValue, expression }: CBState = this.state

        if (
            this.operators.includes(value) &&
            this.operators.includes(currentValue[currentValue.length - 1])
        ) {
            if (value !== '-') {
                let c = currentValue[currentValue.length - 1]
                this.setState({
                    currentValue: currentValue.replace(c, value),
                    expression: expression.replace(c, value),
                })
            } else {
                this.setState({
                    currentValue: currentValue.concat('(' + value + ')'),
                    expression: expression.concat(value),
                })
            }
        } else {
            this.setState({
                currentValue: currentValue.concat(value),
                expression: expression.concat(value),
            })
        }

        // this.setState({
        //     currentValue: currentValue.concat(value),
        //     expression: expression.concat(value),
        // })
    }

    /** Event handler for clear button which will reset the state. */
    handleClearClick = (): void => {
        this.setState(this.initialState)
    }

    /** Event handler for equals button which will evaluate the expresssion. */
    handleEqualsClick = (): void => {
        const { expression }: CBState = this.state

        if (expression.length) {
            // Remove all the leading zeroes.
            let exprStr: string = expression.replace(this.multipleZeroPattern, '') || '0'

            this.setState({
                expression: evaluate2(exprStr),
                currentValue: evaluate2(exprStr),
                hasErrors: false,
                errorMessage: '',
            })
        }
    }

    render() {
        const { currentValue, expression, hasErrors, errorMessage } = this.state

        console.log('Current value: ', expression)

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
                        <NumberButtons onClick={this.handleButtonsClick} />
                        <ActionButtons onClick={this.handleActionClick} />
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
