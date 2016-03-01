import React, { Component } from 'react'
import AppBar from 'material-ui/lib/app-bar'

export default class App extends Component {
    render () {
        return (
            <div>
                <AppBar title="Learn Words" />
                <main className="content">
                    { this.props.children }
                </main>
            </div>
        )
    }
}
