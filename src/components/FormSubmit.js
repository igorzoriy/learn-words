import React from 'react'
import PropTypes from 'prop-types'

const FormSubmit = ({ disabled, title }) => {
    return (
        <button type="submit" className="btn btn-primary" disabled={ disabled }>
            { title }
        </button>
    )
}

FormSubmit.displayName = 'FormSubmit'
FormSubmit.propTypes = {
    title: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
}
FormSubmit.defaultProps = {
    disabled: false,
}

export default FormSubmit
