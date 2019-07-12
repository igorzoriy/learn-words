import classnames from "classnames"
import React, { FunctionComponent } from "react"

export interface IProps {
    type?: "info" | "danger" | "success"
    message: string
}

export const Alert: FunctionComponent<IProps> = ({ type = "info", message }) => (
    <div className={classnames("alert", `alert-${type}`)} role="alert">
        {message}
    </div>
)
