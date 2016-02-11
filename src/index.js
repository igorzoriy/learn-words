import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import store from './store'
import { addVocabularyItem, removeVocabularyItem } from './vocabulary/actions'


store.dispatch(addVocabularyItem('phrase1', 'translation1'))
store.dispatch(addVocabularyItem('phrase2', 'translation2'))
store.dispatch(addVocabularyItem('phrase3', 'translation3'))
store.dispatch(removeVocabularyItem(1))
console.log(store.getState())

class App extends React.Component {
    render () {
        return (
            <div>
                <div>
                    Header
                </div>
                { this.props.children }
            </div>
        )
    }
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
            </Route>
        </Router>
    </Provider>,
    document.getElementById('root')
)
