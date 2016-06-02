import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { openSidebar, closeSidebar } from './actions'

export class App extends Component {
    handleToggle = () => {
        const { dispatch, sidebarOpen } = this.props
        dispatch(sidebarOpen ? closeSidebar() : openSidebar())
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
        const { sidebarOpen } = this.props

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
                    { sidebarOpen ? this.renderMenu() : '' }
                </nav>
                <main className="container-fluid">
                    { this.props.children }
                </main>
            </div>
        )
    }
}

function mapStateToProps (state) {
    return {
        sidebarOpen: state.layout.sidebarOpen,
    }
}

export default connect(mapStateToProps)(App)
