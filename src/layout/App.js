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
                    <Link className="nav-link" to="/vocabulary/list">
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
                        <svg className="icon-menu">
                            <use xlinkHref="#icon-menu" />
                        </svg>
                    </button>
                    <Link to="/" className="navbar-brand">
                        Learn Words
                    </Link>
                    { this.state.open ? this.renderMenu() : '' }
                </nav>
                <main className="container-fluid">
                    { this.props.children }
                </main>
            </div>
        )
    }
}
