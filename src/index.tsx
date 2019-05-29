import * as firebase from "firebase"
import { createBrowserHistory } from "history"
import * as React from "react"
import { render } from "react-dom"
import { Provider } from "react-redux"
import { Router } from "react-router"
import Layout from "./layout/Layout"
import createStore from "./store"

firebase.initializeApp({
    apiKey: "AIzaSyA24sm6mwRrGx8j-2VQ80UZd9C2lHUybeo",
    authDomain: "fiery-fire-8640.firebaseapp.com",
    databaseURL: "https://fiery-fire-8640.firebaseio.com",
})

const history = createBrowserHistory()
const store = createStore()

render(
    <Provider store={store}>
        <Router history={history}>
            <Layout store={store} />
        </Router>
    </Provider>,
    document.getElementById("root"),
)