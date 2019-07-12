import React, { FunctionComponent } from "react"

export interface IProps {
    title: string
    disabled?: boolean
}

export  const FormSubmit: FunctionComponent<IProps> = ({ title, disabled = false }) =>
(
    <button type="submit" className="btn btn-primary" disabled={disabled}>
        {title}
    </button>
)
