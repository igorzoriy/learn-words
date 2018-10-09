import * as classnames from "classnames"
import * as React from "react"

export interface IProps {
    type?: "info" | "danger" | "success"
    message: string
}

const Alert: React.StatelessComponent<IProps> = ({ type, message }) => {
    const className = classnames("alert", `alert-${ type }`)

    return (
        <div className={className} role="alert">
            {message}
        </div>
    )
}

Alert.defaultProps = {
    type: "info",
}

export default Alert
