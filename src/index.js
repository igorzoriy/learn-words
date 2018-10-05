import 'core-js/modules/es6.object.assign'
import 'core-js/modules/es7.array.includes'

import React from 'react'
import { render } from 'react-dom'
import { createBrowserHistory } from 'history'
import { Provider } from 'react-redux'
import { Router } from 'react-router'
import firebase from 'firebase'
import createStore from './store'
import Layout from './layout/Layout'
import { updateUserData } from './account/actions'

const history = createBrowserHistory()
const store = createStore()

firebase.auth().onAuthStateChanged((user) => {
    store.dispatch(updateUserData(user))
})

render(
    <Provider store={ store }>
        <Router history={history}>
            <Layout store={store} history={history} />
        </Router>
    </Provider>,
    document.getElementById('root')
)
