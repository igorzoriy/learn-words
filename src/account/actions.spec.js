import {
    ACTION_UPDATE_USER_DATA,
    ACTION_LOGIN,
    ACTION_LOGOUT,
    updateUserData,
    login,
    logout,
} from './actions'

describe('account actions', () => {
    it('should create an action to update user data', () => {
        expect(updateUserData({})).toEqual({
            type: ACTION_UPDATE_USER_DATA,
            data: {
                user: {},
            },
        })
    })

    it('should create an action to login', () => {
        expect(login()).toEqual({
            type: ACTION_LOGIN,
        })
    })

    it('should create an action to logout', () => {
        expect(logout()).toEqual({
            type: ACTION_LOGOUT,
        })
    })
})
