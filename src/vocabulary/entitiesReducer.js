import merge from 'lodash/merge'
import clone from 'lodash/clone'
import {
    ACTION_GET_VOCABULARY_ITEMS,
    ACTION_REMOVE_VOCABULARY_ITEM,
} from './actions'
import {
    STATUS_SUCCESS,
} from '../api/constants'

const initialState = {}

export default (state = initialState, action) => {
    const { type, status, params, data } = action
    let nextState = {}
    switch (type) {
        case ACTION_GET_VOCABULARY_ITEMS:
            if (status === STATUS_SUCCESS) {
                nextState = data
            }
            return merge({}, state, nextState)

        case ACTION_REMOVE_VOCABULARY_ITEM:
            if (status === STATUS_SUCCESS) {
                nextState = clone(state)
                delete nextState[params.id]
                return nextState
            }
            return state

        default:
            return state
    }
}
