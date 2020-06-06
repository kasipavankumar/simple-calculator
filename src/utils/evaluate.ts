// Utility package to evaluate expressions.
import Stack from './stack'

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

        return evaluatePostfix(infixToPostfix(expr)).toString()
    }

    return ''
}

const infixToPostfix = (infixExpression: string): string => {
    if (infixExpression.length) {
        const alphaPattern: RegExp = /[A-Za-z]/g
        const numberPattern: RegExp = /[0-9]/g
        const operatorsPattern: RegExp = /([\+\-\*\/])/g
        let stack: Stack = new Stack()
        let postfixExpression: string = ''
        let postfixList: string[] = []
        let tokens: string[] = infixExpression
            .replace(operatorsPattern, ' $1 ')
            .split(' ')
            .filter((x) => x.length !== 0)

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
                postfixList.push(token)
            } else if (token === '(') {
                stack.push(token)
            } else if (token === ')') {
                let top = stack.pop()
                while (top !== '(') {
                    postfixList.push(top)
                    top = stack.pop()
                }
            } else {
                while (!stack.isEmpty() && precedence(token) <= precedence(stack.peek())) {
                    postfixList.push(stack.pop())
                }

                stack.push(token)
            }
        })

        while (!stack.isEmpty()) {
            postfixList.push(stack.pop())
        }

        return postfixList.join(' ')
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
            return 0
    }
}

const evaluatePostfix = (postfixExpression: string): number => {
    if (postfixExpression.length) {
        let operandStack = new Stack()
        let tokens = postfixExpression.split(' ')
        let res: number = 0

        log('Tokens ', tokens)

        log('Postfix is ', postfixExpression)

        tokens.forEach((token) => {
            if (!isNaN(Number.parseFloat(token))) {
                operandStack.push(Number.parseFloat(token))
            } else {
                let operand2 = operandStack.pop()
                let operand1 = operandStack.pop()
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
// log(infixToPostfix('5+55+6+80'))
// log(evaluatePostfix(infixToPostfix('5*5-5+6')))
// log(evaluatePostfix(infixToPostfix('2*3+4/2*5')))
log(evaluatePostfix(infixToPostfix('5*-5')))
