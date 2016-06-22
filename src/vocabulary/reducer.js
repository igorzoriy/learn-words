import { combineReducers } from 'redux'
import list from './listReducer'
import form from './formReducer'
import entities from './entitiesReducer'
import flashcards from './flashcardsReducer'

export default combineReducers({
    form,
    list,
    entities,
    flashcards,
})
