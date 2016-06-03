import { combineReducers } from 'redux'
import { routeReducer } from 'react-router-redux'
import layoutReducer from './layout/reducer'
import accountReducer from './account/reducer'
import vocabularyListReducer from './vocabulary/listReducer'
import vocabularyFormReducer from './vocabulary/formReducer'

export default combineReducers({
    routing: routeReducer,
    layout: layoutReducer,
    account: accountReducer,
    vocabularyList: vocabularyListReducer,
    vocabularyForm: vocabularyFormReducer,
})
