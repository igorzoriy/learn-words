import { combineReducers } from "redux"
import entities from "./entitiesReducer"
import form from "./formReducer"

export default combineReducers({
    form,
    entities,
})
