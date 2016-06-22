import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { login } from './actions'
import PageTitle from '../components/PageTitle'
import Alert from '../components/Alert'

export class LoginPage extends Component {
    handleLoginClick = (e) => {
        e.preventDefault()

        const { dispatch } = this.props
        dispatch(login()).then(() => {
            dispatch(push('/'))
        })
    }

    render () {
        const { error } = this.props

        return (
            <div>
                <PageTitle title="Login" />
                <button type="button" className="btn btn-primary btn-lg" onClick={ this.handleLoginClick }>
                    Using Facebook
                </button>
                { error.length ? <Alert key="error" type="danger" message={ error } /> : '' }
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
