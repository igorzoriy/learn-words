import {
    ACTION_LOGIN,
    ACTION_LOGOUT,
    ACTION_UPDATE_USER_DATA,
} from '../api/constants'

export function updateUserData (user) {
    return {
        type: ACTION_UPDATE_USER_DATA,
        data: {
            user,
        },
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
