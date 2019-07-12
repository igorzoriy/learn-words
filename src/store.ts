import { applyMiddleware, createStore } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import { createLogger } from "redux-logger"
import createSagaMiddleware from "redux-saga"
import { reducer } from "./reducer"
import { rootSaga } from "./sagas"

export const createStoreWithMiddlewares = (initialState = {}) => {
    const sagaMiddleware = createSagaMiddleware()
    const store = createStore(
        reducer,
        initialState,
        composeWithDevTools(applyMiddleware(
            sagaMiddleware,
            createLogger({
                collapsed: true,
            }),
        )),
    )
    sagaMiddleware.run(rootSaga)
    return store
}
