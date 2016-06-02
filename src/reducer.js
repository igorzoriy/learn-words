import { combineReducers } from 'redux'
import { routeReducer } from 'react-router-redux'
import layoutReducer from './layout/reducer'
import accountReducer from './account/reducer'
import vocabularyReducer from './vocabulary/reducer'

export default combineReducers({
    routing: routeReducer,
    layout: layoutReducer,
    account: accountReducer,
    vocabulary: vocabularyReducer,
})
