import { combineReducers } from 'redux'
import accountReducer from './account/reducer'
import vocabularyReducer from './vocabulary/reducer'
import flashcards from './flashcards/reducer'
import exercises from './exercises/reducer'

export default combineReducers({
    account: accountReducer,
    vocabulary: vocabularyReducer,
    flashcards,
    exercises,
})
