import mergeWith from 'lodash/mergeWith'
import {
    STATUS_INIT,
    STATUS_SUCCESS,
    ACTION_GET_VOCABULARY_LIST,
    ACTION_REMOVE_VOCABULARY_ITEM,
} from '../api/constants'

const initialState = {
    status: STATUS_INIT,
    items: [],
}

function prepareListData (data) {
    const result = []
    for (const key in data) {
        if (!{}.hasOwnProperty.call(data, key)) {
            continue
        }
        result.push({
            id: key,
            phrase: data[key].phrase,
            translation: data[key].translation,
        })
    }

    return result
}

export default (state = initialState, action) => {
    const { type, status, params, data } = action
    const nextState = {}
    switch (type) {
        case ACTION_GET_VOCABULARY_LIST:
            if (status === STATUS_SUCCESS) {
                nextState.items = prepareListData(data)
            } else {
                nextState.items = []
            }
            nextState.status = status
            return mergeWith({}, state, nextState, (stateValue, nextStateValue, key) => {
                if (key === 'items') {
                    return nextStateValue
                }
            })

        case ACTION_REMOVE_VOCABULARY_ITEM:
            if (status === STATUS_SUCCESS) {
                nextState.items = state.items.filter((item) => item.id !== params.id)
            }
            return mergeWith({}, state, nextState, (stateValue, nextStateValue, key) => {
                if (key === 'items') {
                    return nextStateValue
                }
            })
        default:
            return state
    }
}
