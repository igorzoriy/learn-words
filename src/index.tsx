import * as firebase from "firebase"
import { createBrowserHistory } from "history"
import * as React from "react"
import { render } from "react-dom"
import { Provider } from "react-redux"
import { Router } from "react-router"
import { updateUserData } from "./account/actions"
import Layout from "./layout/Layout"
import createStore from "./store"

const history = createBrowserHistory()
const store = createStore()

firebase.auth().onAuthStateChanged((user) => {
    store.dispatch(updateUserData(user))
})

render(
    <Provider store={store}>
        <Router history={history}>
            <Layout store={store} />
        </Router>
    </Provider>,
    document.getElementById("root"),
)
