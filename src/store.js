import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import { routerMiddleware } from 'react-router-redux'
import { browserHistory } from 'react-router'
import { createFirebaseMiddleware } from './api/firebase'
import reducer from './reducer'

export default function (initialState = {}) {
    const middlewares = [
        thunk,
        routerMiddleware(browserHistory),
        createFirebaseMiddleware({
            apiKey: 'AIzaSyA24sm6mwRrGx8j-2VQ80UZd9C2lHUybeo',
            authDomain: 'fiery-fire-8640.firebaseapp.com',
            databaseURL: 'https://fiery-fire-8640.firebaseio.com',
        }),
        createLogger({
            collapsed: true,
        }),
    ]

    return createStore(reducer, initialState, compose(
        applyMiddleware(...middlewares)
    ))
}
