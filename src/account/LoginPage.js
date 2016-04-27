import React, { Component } from 'react'
import { connect } from 'react-redux'
import { routeActions } from 'react-router-redux'
import { login, logout } from './actions'

export class LoginPage extends Component {
    handleLoginClick = (e) => {
        e.preventDefault()

        const { dispatch } = this.props
        dispatch(login()).then(() => {
            dispatch(routeActions.push('/'))
        })
    }

    handleLogoutClick = (e) => {
        e.preventDefault()

        const { dispatch } = this.props
        dispatch(logout())
    }

    renderError (error) {
        if (error.length === 0) {
            return
        }
        return (
            <div>
                { error }
            </div>
        )
    }

    render () {
        const { error } = this.props

        return (
            <div>
                Login Page
                <button type="button" onClick={ this.handleLoginClick }>
                    login
                </button>
                <button type="button" onClick={ this.handleLogoutClick }>
                    logout
                </button>
                { this.renderError(error) }
            </div>
        )
    }
}

function select (state) {
    return {
        error: state.account.error,
    }
}

export default connect(select)(LoginPage)
