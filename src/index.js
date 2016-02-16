import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import store from './store'
import App from './layout/App'
import LoginPage from './account/LoginPage'

if (!store.getState().account.uid) {
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
            </Route>
        </Router>
    </Provider>,
    document.getElementById('root')
)
