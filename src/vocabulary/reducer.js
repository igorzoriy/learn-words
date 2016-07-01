import { combineReducers } from 'redux'
import form from './formReducer'
import entities from './entitiesReducer'
import flashcards from './flashcardsReducer'

export default combineReducers({
    form,
    entities,
    flashcards,
})
