import classnames from "classnames"
import React, { FunctionComponent } from "react"

export interface IProps {
    modifiers?: string[]
    disabled?: boolean
    children?: React.ReactNode
    onClick(e: React.MouseEvent<HTMLButtonElement>): void
}

export const Button: FunctionComponent<IProps> = ({
    modifiers = ["btn-info"],
    disabled = false,
    children,
    onClick,
}) => (
    <button
        type="button"
        className={classnames("btn", modifiers)}
        onClick={onClick}
        disabled={disabled}
    >
        {children}
    </button>
)
