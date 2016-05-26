import merge from 'lodash/merge'
import {
    ACTION_UPDATE_USER_DATA,
    ACTION_LOGIN,
    ACTION_LOGOUT,
    STATUS_SUCCESS,
    STATUS_FAILURE,
} from '../api/constants'

const initialState = {
    uid: null,
    error: '',
}

export default function accountReducer (state = initialState, action) {
    const { type, status, data } = action

    if (type === ACTION_UPDATE_USER_DATA || (type === ACTION_LOGIN && status === STATUS_SUCCESS)) {
        return merge({}, state, {
            uid: data && data.user && data.user.uid || null,
        })
    } else if (type === ACTION_LOGIN && status === STATUS_FAILURE) {
        return merge({}, state, {
            error: data.message,
        })
    } else if (type === ACTION_LOGOUT && status === STATUS_SUCCESS) {
        return merge({}, state, {
            uid: null,
        })
    }

    return state
}
