import React, { Component, PropTypes } from 'react'

export default class ErrorMessage extends Component {
    static propTypes = {
        message: PropTypes.string.isRequired,
    }

    render () {
        return (
            <div className="alert alert-danger" role="alert">
                { this.props.message }
            </div>
        )
    }
}
