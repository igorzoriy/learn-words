import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import { routeActions } from 'react-router-redux'
import getRoutes from './routes'
import createStore from './store'

const store = createStore()
store.dispatch(routeActions.push('/'))

render(
    <Provider store={ store }>
        <Router history={ browserHistory } routes={ getRoutes(store.dispatch) } />
    </Provider>,
    document.getElementById('root')
)
