import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { auth } from '../firebase'
import { updateUserData } from './actions'

export class LoginPage extends Component {
    static contextTypes = {
        router: PropTypes.object.isRequired,
    };

    handleAuth = (error, authData) => {
        const { dispatch } = this.props

        if (error) {
            console.log("Login Failed!", error)
        } else {
            dispatch(updateUserData(authData))
            this.context.router.push('/')
        }
    }

    handleClick = () => {
        auth(this.handleAuth)
    }

    render () {
        return (
            <div>
                Login Page
                <button type="button" onClick={ this.handleClick }>
                    login
                </button>
            </div>
        )
    }
}

function select () {
    return {}
}

export default connect(select)(LoginPage)
