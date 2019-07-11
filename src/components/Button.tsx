import classnames from "classnames"
import React from "react"

export interface IProps {
    modifiers?: string[]
    disabled?: boolean
    children?: React.ReactNode
    onClick(e: React.MouseEvent<HTMLButtonElement>): void
}

const Button: React.FunctionComponent<IProps> = ({ modifiers, onClick, disabled, children }) => (
    <button
        type="button"
        className={classnames("btn", modifiers)}
        onClick={onClick}
        disabled={disabled}
    >
        {children}
    </button>
)

Button.defaultProps = {
    modifiers: ["btn-info"],
    disabled: false,
}

export default Button
