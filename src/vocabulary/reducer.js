import { combineReducers } from 'redux'
import list from './listReducer'
import form from './formReducer'
import entities from './entitiesReducer'

export default combineReducers({
    form,
    list,
    entities,
})
