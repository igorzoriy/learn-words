import React, { Component } from 'react'
import PageTitle from '../components/PageTitle'
import Alert from '../components/Alert'

export default class NotFoundPage extends Component {
    render () {
        return (
            <div>
                <PageTitle title="Page not found" />
                <Alert key="error" type="danger" message="Invalid route." />
            </div>
        )
    }
}
