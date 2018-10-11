import keys from 'lodash/keys'
import { ActionTypes } from './actions'
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
        case ActionTypes.Fetch:
            nextState.status = status
            if (status === STATUS_SUCCESS) {
                nextState.ids = keys(data)
                nextState.hash = data
            }
            return Object.assign({}, state, nextState)

        case ActionTypes.AddItem:
            if (status === STATUS_SUCCESS) {
                let id = data.key
                nextState = Object.assign({}, state)
                nextState.ids.push(id)
                nextState.hash[id] = {
                    phrase: params.phrase,
                    translation: params.translation,
                }
                return nextState
            }
            return state

        case ActionTypes.EditItem:
            if (status === STATUS_SUCCESS && state.hash[params.id]) {
                nextState = Object.assign({}, state)
                nextState.hash[params.id].phrase = params.phrase
                nextState.hash[params.id].translation = params.translation
                return nextState
            }
            return state

        case ActionTypes.RemoveItem:
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
