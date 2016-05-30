import React, { Component, PropTypes } from 'react'

export default class Alert extends Component {
    static propTypes = {
        message: PropTypes.string.isRequired,
        type: PropTypes.string,
    }

    static defaultProps = {
        type: 'info',
    }

    render () {
        const cssClass = `alert alert-${ this.props.type }`

        return (
            <div className={ cssClass } role="alert">
                { this.props.message }
            </div>
        )
    }
}
