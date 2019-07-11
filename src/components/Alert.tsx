import classnames from "classnames"
import React from "react"

export interface IProps {
    type?: "info" | "danger" | "success"
    message: string
}

export const Alert: React.FunctionComponent<IProps> = ({ type, message }) => {
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
