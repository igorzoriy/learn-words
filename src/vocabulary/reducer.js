import merge from 'lodash/merge'
import {
    STATUS_INIT,
    STATUS_REQUEST,
    STATUS_SUCCESS,
    ACTION_GET_VOCABULARY_LIST,
    ACTION_ADD_VOCABULARY_ITEM,
} from '../api/constants'

const initialState = {
    list: {
        status: STATUS_INIT,
        items: [],
    },
    new: {
        status: STATUS_INIT,
        phrase: '',
        translation: '',
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
    const { type, status, params, data } = action
    let newState = {}
    switch (type) {
        case ACTION_GET_VOCABULARY_LIST:
            newState = {
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
        case ACTION_ADD_VOCABULARY_ITEM:
            newState = {
                new: {
                    status,
                },
            }
            if (status === STATUS_REQUEST) {
                newState.new.phrase = params.phrase
                newState.new.translation = params.translation
            } else if (status === STATUS_INIT || status === STATUS_SUCCESS) {
                newState.new.phrase = ''
                newState.new.translation = ''
            }
            return merge({}, state, newState)
        default:
            return state
    }
}
