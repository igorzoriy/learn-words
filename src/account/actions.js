import {
    ACTION_LOGIN,
    ACTION_LOGOUT,
} from '../api/constants'

export function login () {
    return {
        type: ACTION_LOGIN,
    }
}

export function logout () {
    return {
        type: ACTION_LOGOUT,
    }
}
