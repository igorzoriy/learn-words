import keys from 'lodash/keys'
import union from 'lodash/union'
import {
    ACTION_FETCH_VOCABULARY_ITEMS,
    ACTION_EDIT_VOCABULARY_ITEM,
    ACTION_REMOVE_VOCABULARY_ITEM,
} from './actions'
import {
    STATUS_INIT,
    STATUS_SUCCESS,
} from '../api/constants'

const initialState = {
    status: STATUS_INIT,
    ids: [],
    hash: {},
}

export default (state = initialState, action) => {
    const { type, status, params, data } = action
    let nextState = {}
    switch (type) {
        case ACTION_FETCH_VOCABULARY_ITEMS:
            nextState.status = status
            if (status === STATUS_SUCCESS) {
                nextState.ids = union(state.ids, keys(data))
                nextState.hash = Object.assign({}, state.hash, data)
            }
            return Object.assign({}, state, nextState)

        case ACTION_EDIT_VOCABULARY_ITEM:
            if (status === STATUS_SUCCESS && state.hash[params.id]) {
                nextState = Object.assign({}, state)
                nextState.hash[params.id].phrase = params.phrase
                nextState.hash[params.id].translation = params.translation
                return nextState
            }
            return state

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
