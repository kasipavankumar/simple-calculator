import React, { FunctionComponent } from 'react'

interface IProps {
    message: string
    severity: 'danger' | 'warning' | 'success'
}

/** An alert component to show a message.
 * @param {string} message - Message to be displayed on the notification.
 * @param {string} severity - Severity of the alert. This effects the color of the Alert.
 * Accepted values are `'danger'` | `'warning'` | `'success'`.
 * **Default value is `'success'`.**
 */
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
