import React, { Fragment, FunctionComponent, MouseEvent } from 'react'
import { actionButtons, numberButtons } from './Calculator.data'

interface Props {
    onClick: (event: MouseEvent<HTMLButtonElement>) => void
}

export const NumberButtons: FunctionComponent<Props> = (props) => {
    return (
        <Fragment>
            {numberButtons.map((button) => (
                <button
                    className="button is-info is-medium"
                    onClick={props.onClick}
                    key={button.id}
                    id={button.id}
                    value={button.value}
                >
                    {button.value}
                </button>
            ))}
        </Fragment>
    )
}

export const ActionButtons: FunctionComponent<Props> = (props) => {
    return (
        <Fragment>
            {actionButtons.map((button) => (
                <button
                    className="button is-info is-medium"
                    onClick={props.onClick}
                    key={button.id}
                    id={button.id}
                    value={button.value}
                    // @ts-ignore
                    operation={button.operation && button.operation}
                >
                    {button.value}
                </button>
            ))}
        </Fragment>
    )
}
