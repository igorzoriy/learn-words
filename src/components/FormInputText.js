import React, { PropTypes } from 'react'
import Component from './Component'

export default class FormInputText extends Component {
    static propTypes = {
        placeholder: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
        disabled: PropTypes.bool,
        required: PropTypes.bool,
    }

    static defaultProps = {
        disabled: false,
        required: false,
    }

    render () {
        return (
            <input type="text" className="form-control" { ...this.props } />
        )
    }
}
