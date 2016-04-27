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
            url: 'fiery-fire-8640.firebaseio.com',
        }),
        createLogger({
            collapsed: true,
        }),
    ]

    const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore)

    return createStoreWithMiddleware(reducer, initialState)
}
