import {
    ACTION_GET_USER_DATA,
    ACTION_LOGIN,
    ACTION_LOGOUT,
} from '../api/constants'


export function getUserData () {
    return {
        type: ACTION_GET_USER_DATA,
    }
}

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
