import React, { PropTypes } from 'react'

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
