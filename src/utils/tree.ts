class ExpressionTree {
    value: any
    left: ExpressionTree | null
    right: ExpressionTree | null

    constructor(value: any) {
        this.value = value
        this.left = null
        this.right = null
    }

    public inorder = (node: ExpressionTree | null): void => {
        this.inorder(this.left)
        console.log(this.value)
        this.inorder(this.right)
    }

    public preorder = (node: ExpressionTree | null): void => {
        console.log(this.value)
        this.preorder(this.left)
        this.preorder(this.right)
    }
}

export default ExpressionTree
