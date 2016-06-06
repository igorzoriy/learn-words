import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import getRoutes from './routes'
import createStore from './store'

const store = createStore()
const history = syncHistoryWithStore(browserHistory, store)

render(
    <Provider store={ store }>
        <Router history={ history } routes={ getRoutes(store.dispatch) } />
    </Provider>,
    document.getElementById('root')
)
