import React, { PropTypes } from 'react'
import Component from './Component'

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
