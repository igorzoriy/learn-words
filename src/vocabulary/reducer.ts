import { combineReducers } from "redux"
import { addReducer as add } from "./addReducer"
import { editReducer as edit } from "./editReducer"
import { entitiesReducer as entities } from "./entitiesReducer"

export const vocabularyReducer = combineReducers({
    add,
    edit,
    entities,
})
