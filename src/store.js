import { createStore, applyMiddleware } from 'redux'
import { browserHistory } from 'react-router'
import { syncHistory } from 'react-router-redux'
import reducer from './reducer'

const middlewares = [
    syncHistory(browserHistory),
]
const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore)

export default createStoreWithMiddleware(reducer)
