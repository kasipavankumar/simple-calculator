interface IMappings {
    id: string
    value: number | string
    operation?: string | null
}

export const numberButtons: IMappings[] = [
    { id: 'zero', value: 0 },
    { id: 'one', value: 1 },
    { id: 'two', value: 2 },
    { id: 'three', value: 3 },
    { id: 'four', value: 4 },
    { id: 'five', value: 5 },
    { id: 'six', value: 6 },
    { id: 'seven', value: 7 },
    { id: 'eight', value: 8 },
    { id: 'nine', value: 9 },
]

export const actionButtons: IMappings[] = [
    { id: 'add', value: '+', operation: '+' },
    { id: 'subtract', value: '-', operation: '-' },
    { id: 'multiply', value: '*', operation: '*' },
    { id: 'divide', value: '/', operation: '/' },
    { id: 'exponent', value: '^', operation: '**' },
    { id: 'decimal', value: '.' },
]
