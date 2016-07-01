import keys from 'lodash/keys'
import union from 'lodash/union'
import {
    ACTION_FETCH_VOCABULARY_ITEMS,
    ACTION_REMOVE_VOCABULARY_ITEM,
} from './actions'
import {
    STATUS_SUCCESS,
} from '../api/constants'

const initialState = {
    ids: [],
    hash: {},
}

export default (state = initialState, action) => {
    const { type, status, params, data } = action
    let nextState = {}
    switch (type) {
        case ACTION_FETCH_VOCABULARY_ITEMS:
            if (status === STATUS_SUCCESS) {
                nextState = {
                    ids: union(state.ids, keys(data)),
                    hash: Object.assign({}, state.hash, data),
                }
            }
            return Object.assign({}, state, nextState)

        case ACTION_REMOVE_VOCABULARY_ITEM:
            if (status === STATUS_SUCCESS) {
                nextState = Object.assign({}, state)
                nextState.ids.splice(state.ids.indexOf(params.id), 1)
                delete nextState.hash[params.id]
                return nextState
            }
            return state

        default:
            return state
    }
}
