import merge from 'lodash/merge'
import {
    ACTION_GET_USER_DATA,
    ACTION_LOGIN,
    ACTION_LOGOUT,
    STATUS_SUCCESS,
} from '../api/constants'

const initialState = {
    uid: null,
}

export default function accountReducer (state = initialState, action) {
    const { type, status, data } = action

    if (type === ACTION_GET_USER_DATA || (type === ACTION_LOGIN && status === STATUS_SUCCESS)) {
        return merge({}, state, {
            uid: data && data.uid || null,
        })
    } else if (type === ACTION_LOGOUT && status === STATUS_SUCCESS) {
        return merge({}, state, {
            uid: null,
        })
    }

    return state
}
