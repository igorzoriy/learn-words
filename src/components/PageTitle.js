import React, { Component, PropTypes } from 'react'

export default class PageTitle extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
    }

    render () {
        return (
            <h1>
                { this.props.title }
            </h1>
        )
    }
}
