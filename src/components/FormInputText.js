import React, { PropTypes } from 'react'

const FormInputText = (props) => {
    return <input type="text" className="form-control" { ...props } />
}

FormInputText.displayName = 'FormInputText'
FormInputText.propTypes = {
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    required: PropTypes.bool,
}
FormInputText.defaultProps = {
    disabled: false,
    required: false,
}

export default FormInputText
