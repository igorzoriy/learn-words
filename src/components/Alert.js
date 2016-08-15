import React, { PropTypes } from 'react'
import classnames from 'classnames'

const Alert = ({ type, message }) => {
    let className = classnames('alert', `alert-${ type }`)

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
