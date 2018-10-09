import * as classnames from "classnames"
import * as React from "react"

export interface IProps {
    modifiers?: string[]
    disabled?: boolean
    children?: React.ReactNode
    onClick(e: React.MouseEvent<HTMLButtonElement>): void
}

const Button: React.StatelessComponent<IProps> = ({ modifiers, onClick, disabled, children }) => {
    return (
        <button
            type="button"
            className={classnames("btn", modifiers)}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    )
}
Button.defaultProps = {
    modifiers: ["btn-info"],
    disabled: false,
}

export default Button
