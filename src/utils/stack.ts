class Stack {
    private list: any[]
    private top: number

    constructor() {
        this.list = []
        this.top = 0
    }

    public length = (): number => {
        return this.top
    }

    public push = (element: any): void => {
        this.list[this.top] = element
        this.top = this.top + 1
    }

    public pop = (): any => {
        if (!this.isEmpty()) {
            this.top = this.top - 1
            return this.list.pop()
        }
    }

    public peek = (): any => {
        return this.list[this.top - 1]
    }

    public isEmpty = (): boolean => {
        return this.top === 0
    }

    public print = (): void => {
        let top = this.top - 1
        while (top >= 0) {
            console.log(this.list[top])
            top = top - 1
        }
    }
}

export default Stack
