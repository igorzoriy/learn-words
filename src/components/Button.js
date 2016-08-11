import React, { PropTypes } from 'react'

const Button = ({ modifier, onClick, disabled, children }) => {
    let className = `btn btn-${modifier}`

    return (
        <button
            type="button"
            className={ className }
            onClick={ onClick }
            disabled={ disabled }
        >
            { children }
        </button>
    )
}

Button.propTypes = {
    modifier: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    children: PropTypes.string.isRequired,
}

Button.defaultProps = {
    modifier: 'info',
    disabled: false,
}

export default Button
