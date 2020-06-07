class ExpressionTree {
    value: any
    left: ExpressionTree | null
    right: ExpressionTree | null

    constructor(value: any) {
        this.value = value
        this.left = null
        this.right = null
    }

    // private inorder = (node: ExpressionTree | null): void => {
    //     this.inorder(this.left)
    //     console.log(this.value)
    //     this.inorder(this.right)
    // }

    // private preorder = (node: ExpressionTree | null): void => {
    //     console.log(this.value)
    //     this.preorder(this.left)
    //     this.preorder(this.right)
    // }
}

export default ExpressionTree
