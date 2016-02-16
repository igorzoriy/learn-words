import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import createStore from './store'
import { getAuth } from './firebase'
import { updateUserData } from './account/actions'
import App from './layout/App'
import LoginPage from './account/LoginPage'
import NewVocabularyItemPage from './vocabulary/NewItemPage'

const store = createStore()


const authData = getAuth()

if (authData) {
    store.dispatch(updateUserData(authData.uid))
} else {
    browserHistory.push('/login')
}

class IndexPage extends React.Component {
    render () {
        return (
            <div>
                index page
            </div>
        )
    }
}

render(
    <Provider store={ store }>
        <Router history={ browserHistory }>
            <Route path="/" component={ App }>
                <IndexRoute component={ IndexPage } />
                <Route path="login" component={ LoginPage } />
                <Route path="vocabulary/new" component={ NewVocabularyItemPage } />
            </Route>
        </Router>
    </Provider>,
    document.getElementById('root')
)
