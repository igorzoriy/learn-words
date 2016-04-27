import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { login, logout } from './actions'

export class LoginPage extends Component {
    static contextTypes = {
        router: PropTypes.object.isRequired,
    };

    handleLoginClick = (e) => {
        e.preventDefault()

        const { dispatch } = this.props
        dispatch(login())
    }

    handleLogoutClick = (e) => {
        e.preventDefault()

        const { dispatch } = this.props
        dispatch(logout())
    }

    render () {
        return (
            <div>
                Login Page
                <button type="button" onClick={ this.handleLoginClick }>
                    login
                </button>
                <button type="button" onClick={ this.handleLogoutClick }>
                    logout
                </button>
            </div>
        )
    }
}

function select () {
    return {}
}

export default connect(select)(LoginPage)
