import * as React from 'react'
import { actionButtons, numberButtons } from './Calculator.data'

interface Props {
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const Buttons: React.FunctionComponent<Props> = (props) => {
    return (
        <React.Fragment>
            <NumberButtons onClick={props.onClick} />
            <ActionButtons onClick={props.onClick} />
        </React.Fragment>
    )
}

interface NBProps extends Props {}

const NumberButtons: React.FunctionComponent<NBProps> = (props) => {
    return (
        <React.Fragment>
            {numberButtons.map((button) => (
                <button className="button is-info is-medium" onClick={props.onClick} key={button.id} id={button.id} value={button.value}>
                    {button.value}
                </button>
            ))}
        </React.Fragment>
    )
}

interface ABProps extends Props {}

const ActionButtons: React.FunctionComponent<ABProps> = (props) => {
    return (
        <React.Fragment>
            {actionButtons.map((button) => (
                // @ts-ignore
                <button className="button is-info is-medium" onClick={props.onClick} key={button.id} id={button.id} value={button.value} operation={button.operation && button.operation}>
                    {button.value}
                </button>
            ))}
        </React.Fragment>
    )
}

export default Buttons
