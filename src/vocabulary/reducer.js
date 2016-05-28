import merge from 'lodash/merge'
import {
    STATUS_INIT,
    STATUS_SUCCESS,
    ACTION_GET_VOCABULARY_LIST,
} from '../api/constants'

const initialState = {
    list: {
        status: STATUS_INIT,
        items: [],
    },
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

export default function vocabularyReducer (state = initialState, action) {
    const { type, status, data } = action
    switch (type) {
        case ACTION_GET_VOCABULARY_LIST:
            const newState = {
                list: {
                    status,
                },
            }
            if (status === STATUS_SUCCESS) {
                newState.list.items = prepareListData(data)
            } else {
                newState.list.items = []
            }
            return merge({}, state, newState)
        default:
            return state
    }
}
