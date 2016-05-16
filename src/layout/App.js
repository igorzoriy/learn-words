import React, { Component } from 'react'
import { Link } from 'react-router'

export default class App extends Component {
    state = {
        open: false,
    }

    handleToggle = () => {
        this.setState({
            open: !this.state.open,
        })
    }

    renderMenu () {
        return (
            <ul className="nav navbar-nav">
                <li className="navbar-nav-item">
                    <Link className="nav-link" to="/vocabulary/new">
                        Add new item
                    </Link>
                </li>
                <li className="navbar-nav-item">
                    <Link className="nav-link" to="/vocabulary">
                        Vocabulary list
                    </Link>
                </li>
            </ul>
        )
    }

    render () {
        return (
            <div>
                <nav className="navbar navbar-dark bg-inverse">
                    <button
                        type="button"
                        className="navbar-toggler"
                        onClick={ this.handleToggle }
                        >
                        &#9776;
                    </button>
                    <Link to="/" className="navbar-brand">
                        Learn Words
                    </Link>
                    { this.state.open ? this.renderMenu() : '' }
                </nav>
                <main className="content">
                    { this.props.children }
                </main>
            </div>
        )
    }
}
