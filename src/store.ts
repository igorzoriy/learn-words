import { applyMiddleware, createStore } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import { createLogger } from "redux-logger"
import thunk from "redux-thunk"
import { createFirebaseMiddleware } from "./api/firebase"
import reducer from "./reducer"

export default function(initialState = {}) {
    const middlewares = [
        thunk,
        createFirebaseMiddleware({
            apiKey: "AIzaSyA24sm6mwRrGx8j-2VQ80UZd9C2lHUybeo",
            authDomain: "fiery-fire-8640.firebaseapp.com",
            databaseURL: "https://fiery-fire-8640.firebaseio.com",
        }),
        createLogger({
            collapsed: true,
        }),
    ]

    return createStore(
        reducer,
        initialState,
        composeWithDevTools(applyMiddleware(...middlewares),
        ),
    )
}
