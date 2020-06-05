// Utility package to evaluate expressions.

const { log }: Console = console
const operators = ['+', '-', '*', '/', '^', '.']

// TODO: Add export.
const evaluate = (expression: string): string => {
    if (expression.length) {
        // let zeroPattern: RegExp = /(^[0]{1,})/gi
        let stripPattern: RegExp = /(^[0+\-*\/]{1,})|([+\-*\/]{1,}$)/gi

        // Clean the expression by removing leading & trailing strings.
        let expr: string = expression.replace(stripPattern, '') || ''

        return eval(expr)
    }

    return ''
}

const validateExpression = (expression: string): string => {
    if (expression.length) {
        let split = expression.split('')
        let res: string[] = []

        split.forEach((val, index) => {
            if (operators.includes(val)) {
                res = [...expression.slice(0, index)]
            }
        })

        log(res)
    }

    return ''
}

const tests: string[] = ['000000005+5-++/', '5/5']

// tests.forEach((test) => log(validateExpression(test)))
validateExpression('5.5.5')
log('5.5.5'.split(''))
