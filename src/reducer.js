import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import layoutReducer from './layout/reducer'
import accountReducer from './account/reducer'
import vocabularyReducer from './vocabulary/reducer'
import flashcards from './flashcards/reducer'
import exercises from './exercises/reducer'

export default combineReducers({
    routing: routerReducer,
    layout: layoutReducer,
    account: accountReducer,
    vocabulary: vocabularyReducer,
    flashcards,
    exercises,
})
