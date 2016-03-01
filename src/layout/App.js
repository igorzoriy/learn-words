import React, { Component } from 'react'

export default class App extends Component {
    render () {
        return (
            <div>
                <header className="header">
                    Header
                </header>
                <main className="content">
                    { this.props.children }
                </main>
            </div>
        )
    }
}
