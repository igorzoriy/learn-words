import expect from 'expect.js'
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
        expect(updateUserData({})).to.eql({
            type: ACTION_UPDATE_USER_DATA,
            data: {
                user: {},
            },
        })
    })

    it('should create an action to login', () => {
        expect(login()).to.eql({
            type: ACTION_LOGIN,
        })
    })

    it('should create an action to logout', () => {
        expect(logout()).to.eql({
            type: ACTION_LOGOUT,
        })
    })
})
