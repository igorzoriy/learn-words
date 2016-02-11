import { combineReducers } from 'redux'
import { routeReducer } from 'react-router-redux'
import vocabularyReducer from './vocabulary/reducer'

export default combineReducers({
    routing: routeReducer,
    vocabulary: vocabularyReducer,
})
