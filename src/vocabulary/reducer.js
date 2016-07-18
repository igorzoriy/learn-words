import { combineReducers } from 'redux'
import form from './formReducer'
import entities from './entitiesReducer'

export default combineReducers({
    form,
    entities,
})
