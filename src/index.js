import injectTapEventPlugin from 'react-tap-event-plugin'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { routeActions } from 'react-router-redux'
import createStore from './store'
import { getUserData } from './account/actions'
import App from './layout/App'
import LoginPage from './account/LoginPage'
import NewVocabularyItemPage from './vocabulary/NewItemPage'

injectTapEventPlugin()

const store = createStore()
store.dispatch(getUserData())
const state = store.getState()
if (state.account.uid === null) {
    store.dispatch(routeActions.push('/login'))
}

render(
    <Provider store={ store }>
        <Router history={ browserHistory }>
            <Route path="/" component={ App }>
                <IndexRoute component={ NewVocabularyItemPage } />
                <Route path="login" component={ LoginPage } />
                <Route path="vocabulary/new" component={ NewVocabularyItemPage } />
            </Route>
        </Router>
    </Provider>,
    document.getElementById('root')
)
