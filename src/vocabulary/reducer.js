import merge from 'lodash/merge'
import mergeWith from 'lodash/mergeWith'
import {
    STATUS_INIT,
    STATUS_REQUEST,
    STATUS_SUCCESS,
    ACTION_GET_VOCABULARY_LIST,
    ACTION_ADD_VOCABULARY_ITEM,
    ACTION_REMOVE_VOCABULARY_ITEM,
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
    let nextState = {}
    switch (type) {
        case ACTION_GET_VOCABULARY_LIST:
            nextState = {
                list: {
                    status,
                },
            }
            if (status === STATUS_SUCCESS) {
                nextState.list.items = prepareListData(data)
            } else {
                nextState.list.items = []
            }

            return mergeWith({}, state, nextState, (stateValue, nextStateValue, key) => {
                if (key === 'items') {
                    return nextStateValue
                }
            })

        case ACTION_REMOVE_VOCABULARY_ITEM:
            if (status !== STATUS_SUCCESS) {
                return state
            } else {
                nextState = {
                    list: {
                        items: state.list.items.filter((item) => item.id !== params.id),
                    },
                }
                return mergeWith({}, state, nextState, (stateValue, nextStateValue, key) => {
                    if (key === 'items') {
                        return nextStateValue
                    }
                })
            }
            break

        case ACTION_ADD_VOCABULARY_ITEM:
            nextState = {
                new: {
                    status,
                },
            }
            if (status === STATUS_REQUEST) {
                nextState.new.phrase = params.phrase
                nextState.new.translation = params.translation
            } else if (status === STATUS_INIT || status === STATUS_SUCCESS) {
                nextState.new.phrase = ''
                nextState.new.translation = ''
            }

            return merge({}, state, nextState)

        default:
            return state
    }
}
