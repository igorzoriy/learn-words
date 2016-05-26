import { createStore, applyMiddleware } from 'redux'
import { browserHistory } from 'react-router'
import { syncHistory } from 'react-router-redux'
import createLogger from 'redux-logger'
import { createFirebaseMiddleware } from './api/firebase'
import reducer from './reducer'

export default function (initialState = {}) {
    const middlewares = [
        syncHistory(browserHistory),
        createFirebaseMiddleware({
            apiKey: 'AIzaSyA24sm6mwRrGx8j-2VQ80UZd9C2lHUybeo',
            authDomain: 'fiery-fire-8640.firebaseapp.com',
            databaseURL: 'https://fiery-fire-8640.firebaseio.com',
        }),
        createLogger({
            collapsed: true,
        }),
    ]

    const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore)

    return createStoreWithMiddleware(reducer, initialState)
}
