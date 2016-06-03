import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { routeActions } from 'react-router-redux'
import { openSidebar, closeSidebar } from './actions'
import { logout } from '../account/actions'

export class App extends Component {
    handleToggle = () => {
        const { dispatch, sidebarOpen } = this.props
        dispatch(sidebarOpen ? closeSidebar() : openSidebar())
    }

    handleLogoutClick = (e) => {
        e.preventDefault()
        const { dispatch } = this.props
        dispatch(logout()).then(() => {
            dispatch(routeActions.push('/login'))
        })
    }

    renderMenu (isAnonymous) {
        const logout = (
            <li className="navbar-nav-item">
                <button type="button" className="navbar-nav-item-button" onClick={ this.handleLogoutClick }>
                    Logout
                </button>
            </li>
        )

        return (
            <ul className="nav navbar-nav">
                <li className="navbar-nav-item">
                    <Link className="nav-link" to="/vocabulary/list">
                        Vocabulary list
                    </Link>
                </li>
                <li className="navbar-nav-item">
                    <Link className="nav-link" to="/vocabulary/add">
                        Add new item
                    </Link>
                </li>
                { !isAnonymous ? logout : '' }
            </ul>
        )
    }

    render () {
        const { sidebarOpen, isAnonymous } = this.props

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
                    { sidebarOpen ? this.renderMenu(isAnonymous) : '' }
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
        isAnonymous: state.account.isAnonymous,
    }
}

export default connect(mapStateToProps)(App)
