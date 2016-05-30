import React, { PropTypes } from 'react'
import Component from './Component'

export default class FormInputText extends Component {
    static propTypes = {
        placeholder: PropTypes.string.isRequired,
        defaultValue: PropTypes.string,
        disabled: PropTypes.bool,
        required: PropTypes.bool,
    }

    static defaultProps = {
        defaultValue: '',
        disabled: false,
        required: false,
    }

    render () {
        return (
            <input type="text" className="form-control" { ...this.props } />
        )
    }
}
