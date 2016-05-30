import React, { Component, PropTypes } from 'react'

export default class FormSubmit extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        disabled: PropTypes.bool,
    }

    static defaultProps = {
        disabled: false,
    }

    render () {
        return (
            <button type="submit" className="btn btn-primary" disabled={ this.props.disabled }>
                { this.props.title }
            </button>
        )
    }
}
