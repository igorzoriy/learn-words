import * as React from "react"

export interface IProps {
    title: string
    disabled?: boolean
}

const FormSubmit: React.StatelessComponent<IProps> = ({ title, disabled }) => {
    return (
        <button type="submit" className="btn btn-primary" disabled={disabled}>
            {title}
        </button>
    )
}

FormSubmit.defaultProps = {
    disabled: false,
}

export default FormSubmit
