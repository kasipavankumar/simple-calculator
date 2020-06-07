// Utility package to evaluate expressions.
import Expression from './expression'

const { log }: Console = console

/**
 * Evaluates the given expression by converting it to postfix notation.
 * @param expression The expression to be evaluated.
 */
export const evaluate2 = (expression: string): string | undefined => {
    if (expression.length) {
        let resExpression = new Expression(expression)
        let res = resExpression.evaluatePostfix().toString()
        return resExpression.evaluatePostfix().toString()
    }
}
