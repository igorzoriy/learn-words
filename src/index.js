import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import getRoutes from './routes'
import createStore from './store'

const store = createStore()

render(
    <Provider store={ store }>
        <Router history={ browserHistory } routes={ getRoutes(store.dispatch) } />
    </Provider>,
    document.getElementById('root')
)
