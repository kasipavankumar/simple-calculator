import React, { FunctionComponent } from 'react'

interface IProps {
    message: string
    severity: 'danger' | 'warning' | 'success'
}

const Alert: FunctionComponent<IProps> = (props: IProps): JSX.Element => {
    const { severity, message } = props

    return (
        <div className={`notification is-${severity}`}>
            <p>{message}</p>
        </div>
    )
}

Alert.defaultProps = {
    message: '',
    severity: 'success',
}

export default Alert
