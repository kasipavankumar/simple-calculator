import React, { Fragment, FunctionComponent, MouseEvent } from 'react'
import { actionButtons, numberButtons } from './Calculator.data'

interface Props {
    onClick: (event: MouseEvent<HTMLButtonElement>) => void
}

const Buttons: FunctionComponent<Props> = (props) => {
    return (
        <Fragment>
            <NumberButtons onClick={props.onClick} />
            <ActionButtons onClick={props.onClick} />
        </Fragment>
    )
}

interface NBProps extends Props {}

const NumberButtons: FunctionComponent<NBProps> = (props) => {
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

interface ABProps extends Props {}

const ActionButtons: FunctionComponent<ABProps> = (props) => {
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

export default Buttons
