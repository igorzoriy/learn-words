import { combineReducers } from 'redux'
import { routeReducer } from 'react-router-redux'
import accountReducer from './account/reducer'
import vocabularyReducer from './vocabulary/reducer'

export default combineReducers({
    routing: routeReducer,
    account: accountReducer,
    vocabulary: vocabularyReducer,
})
