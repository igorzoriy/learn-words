import {
    ACTION_UPDATE_USER_DATA,
    ACTION_LOGIN,
    ACTION_LOGOUT,
} from './actions'
import {
    STATUS_SUCCESS,
    STATUS_FAILURE,
} from '../api/constants'

const initialState = {
    isAnonymous: true,
    uid: null,
    error: '',
}

export default function accountReducer (state = initialState, action) {
    const { type, status, data } = action
    let nextState = {}

    if (type === ACTION_UPDATE_USER_DATA || (type === ACTION_LOGIN && status === STATUS_SUCCESS)) {
        if (data && data.user) {
            nextState = {
                isAnonymous: false,
                uid: data.user.uid,
            }
            return Object.assign({}, state, nextState)
        }
    } else if (type === ACTION_LOGIN && status === STATUS_FAILURE) {
        return Object.assign({}, state, {
            error: data.message,
        })
    } else if (type === ACTION_LOGOUT && status === STATUS_SUCCESS) {
        return Object.assign({}, state, {
            uid: null,
            isAnonymous: true,
        })
    }

    return state
}
