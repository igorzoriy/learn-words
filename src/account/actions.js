export const ACTION_UPDATE_USER_DATA = 'account/update-user-data'
export const ACTION_LOGIN = 'account/login'
export const ACTION_LOGOUT = 'account/logout'

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
