import React, { PropTypes } from 'react'
import classnames from 'classnames'

const Button = ({ modifiers, onClick, disabled, children }) => {
    return (
        <button
            type="button"
            className={ classnames('btn', modifiers) }
            onClick={ onClick }
            disabled={ disabled }
        >
            { children }
        </button>
    )
}

Button.displayName = 'Button'
Button.propTypes = {
    modifiers: PropTypes.array,
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    children: PropTypes.string.isRequired,
}
Button.defaultProps = {
    modifiers: ['btn-info'],
    disabled: false,
}

export default Button
