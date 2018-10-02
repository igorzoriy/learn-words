import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { push } from 'react-router-redux'
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
            dispatch(push('/login'))
        })
    }

    renderMenu (isAnonymous) {
        let content = []
        if (!isAnonymous) {
            content.push(
                <li className="navbar-nav-item" key="list">
                    <Link className="nav-link" to="/vocabulary/list">
                        Vocabulary list
                    </Link>
                </li>,
                <li className="navbar-nav-item" key="add">
                    <Link className="nav-link" to="/vocabulary/add">
                        Add new item
                    </Link>
                </li>,
                <li className="navbar-nav-item" key="flashcards">
                    <Link className="nav-link" to="/flashcards">
                        Flashcards
                    </Link>
                </li>,
                <li className="navbar-nav-item" key="exercise1">
                    <Link className="nav-link" to="/exercises/phrase-translation">
                        Phrase-Translation Exercise
                    </Link>
                </li>,
                <li className="navbar-nav-item" key="logout">
                    <button type="button" className="navbar-nav-item-button" onClick={ this.handleLogoutClick }>
                        Logout
                    </button>
                </li>
            )
        } else {
            content.push(
                <li className="navbar-nav-item" key="login">
                    <Link className="nav-link" to="/login">
                        Login
                    </Link>
                </li>
            )
        }

        return (
            <ul className="nav navbar-nav">
                { content }
            </ul>
        )
    }

    render () {
        const { sidebarOpen, isAnonymous } = this.props

        return (
            <div>
                <nav className="navbar navbar-dark bg-dark">
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
