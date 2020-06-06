// Utility package to evaluate expressions.
import Stack from './stack'
import ExpressionTree from './tree'

const { log }: Console = console
const operators = ['+', '-', '*', '/', '^']
const leadingZeroesPattern: RegExp = /(^[0+\-*\/]{1,})/g
const trailingSymbolsPattern: RegExp = /([+\-*\/]{1,}$)/g
const stripPattern: RegExp = /(^[0+\-*\/]{1,})|([+\-*\/]{1,}$)/gi
const multipleOperatorsPattern: RegExp = /(?=\d)|([\+\*\/]{2,})|(?=\d)/g

export const evaluate = (expression: string): string => {
    if (expression.length) {
        // Clean the expression by removing leading & trailing strings.
        let expr: string = expression.replace(stripPattern, '') || ''

        return eval(expr).toString()
    }

    return ''
}

const infixToPostfix = (infixExpression: string): string => {
    if (infixExpression.length) {
        let stack: Stack = new Stack()
        let postfixExpression: string = ''
        // let tokens: string[] = infixExpression.split('')
        let tokens: string[] = infixExpression.split(/([\+\*\-\/])/g)
        const alphaPattern: RegExp = /[A-Za-z]/g
        const numberPattern: RegExp = /[0-9]/g
        let precedence = (operator: string): number => {
            switch (operator) {
                case '^':
                    return 3
                case '*':
                case '/':
                    return 2
                case '+':
                case '-':
                    return 1
                default:
                    return 0
            }
        }

        // https://runestone.academy/runestone/books/published/pythonds/BasicDS/InfixPrefixandPostfixExpressions.html
        tokens.forEach((token) => {
            if (!isNaN(Number.parseFloat(token))) {
                postfixExpression += token
            } else if (token === '(') {
                stack.push(token)
            } else if (token === ')') {
                let top = stack.pop()
                while (top !== '(') {
                    postfixExpression += top
                    top = stack.pop()
                }
            } else {
                while (!stack.isEmpty() && precedence(token) <= precedence(stack.peek())) {
                    postfixExpression += stack.pop()
                }

                stack.push(token)
            }
        })

        while (!stack.isEmpty()) {
            postfixExpression += stack.pop()
        }

        return postfixExpression
    }

    return ''
}

const performMath = (operator: string, operand1: number, operand2: number): number => {
    switch (operator) {
        case '*':
            return operand1 * operand2
        case '/':
            return operand1 / operand2
        case '+':
            return operand1 + operand2
        case '-':
            return operand1 - operand2
        default:
            return -1
    }
}

const evaluatePostfix = (postfixExpression: string): number => {
    if (postfixExpression.length) {
        let operandStack = new Stack()
        let tokens = postfixExpression.split('')
        // let tokens = postfixExpression.split(/([\+\*\-\/])/g)
        let res: number = 0

        log('Postfix is ', postfixExpression)

        tokens.forEach((token) => {
            if (!isNaN(Number.parseFloat(token))) {
                operandStack.push((token))
            } else {
                let operand1 = operandStack.pop()
                let operand2 = operandStack.pop()
                let result = performMath(token, operand1, operand2)
                operandStack.push(result)
            }
        })

        res = operandStack.pop()
        return res
    }

    return -1
}

// log(infixToPostfix('A*B+C*D'))
// log(infixToPostfix('(A+B)*C-(D-E)*(F+G)'))
// log(evaluatePostfix(infixToPostfix('5*5+5')))
log(infixToPostfix('5+55+6+80'))
