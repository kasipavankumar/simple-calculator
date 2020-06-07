// Utility package to evaluate expressions.
import Expression from './expression'

// For debugging purposes.
const { log }: Console = console

/**
 * Evaluates the given expression by converting it to postfix notation.
 * @param expression The expression to be evaluated.
 */
export const evaluate2 = (expression: string): string | undefined => {
    if (expression.length) {
        let patt: RegExp = /([\W]){2,}/g
        let clean = expression.replace(patt, '$1')
        let resExpression = new Expression(clean)
        return resExpression.evaluatePostfix().toString()
    }
}
