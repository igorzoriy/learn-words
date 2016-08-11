import React, { PropTypes } from 'react'

const Alert = ({ type, message }) => {
    let className = `alert alert-${ type }`

    return (
        <div className={ className } role="alert">
            { message }
        </div>
    )
}

Alert.displayName = 'Alert'
Alert.propTypes = {
    message: PropTypes.string.isRequired,
    type: PropTypes.string,
}
Alert.defaultProps = {
    type: 'info',
}

export default Alert
