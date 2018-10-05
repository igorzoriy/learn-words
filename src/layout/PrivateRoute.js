import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router'

export default class PrivateRoute extends Component {
    static propTypes = {
        isLoggedIn: PropTypes.bool.isRequired,
        component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
    }

    render () {
        if (!this.props.isLoggedIn) {
            return <Redirect to={{ pathname: '/login', state: { from: this.props.location } }} />
        }
        return <Route {...this.props} />
    }
}
