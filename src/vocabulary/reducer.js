import { List } from 'immutable'
import * as actionTypes from './actionTypes'

export function vocabularyReducer (state = List(), action) {
    const { type, ...data } = action
    switch (type) {
        case actionTypes.ADD_VOCABULARY_ITEM:
            return state.push(data)
        case actionTypes.REMOVE_VOCABULARY_ITEM:
            return state.delete(data.id)
        default:
            return state
    }
}
