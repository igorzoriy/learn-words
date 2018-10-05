import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router'
import { connect } from 'react-redux'
import { login } from './actions'
import PageTitle from '../components/PageTitle'
import Alert from '../components/Alert'
import Button from '../components/Button'

export class LoginPage extends Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        isAnonymous: PropTypes.bool.isRequired,
        error: PropTypes.string.isRequired,
    }

    handleLoginClick = (e) => {
        e.preventDefault()
        this.props.dispatch(login())
    }

    render () {
        const { isAnonymous, error } = this.props

        if (!isAnonymous) {
            return <Redirect to={{ pathname: '/vocabulary/list', state: { from: this.props.location } }} />
        }

        return (
            <div>
                <PageTitle title="Login" />
                <Button modifiers={ ['btn-primary', 'btn-lg'] } onClick={ this.handleLoginClick }>
                    Using Facebook
                </Button>
                { error.length ? <Alert key="error" type="danger" message={ error } /> : '' }
            </div>
        )
    }
}

function mapStateToProps (state) {
    return {
        isAnonymous: state.account.isAnonymous,
        error: state.account.error,
    }
}

export default connect(mapStateToProps)(LoginPage)
