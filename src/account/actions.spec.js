import expect from 'expect.js'
import { login, logout, getUserData } from './actions'
import {
    ACTION_LOGIN,
    ACTION_LOGOUT,
    ACTION_GET_USER_DATA,
} from '../api/constants'

describe('account actions', () => {
    it('should create an action to login', () => {
        expect(login({
        })).to.eql({
            type: ACTION_LOGIN,
        })
    })

    it('should create an action to logout', () => {
        expect(logout({
        })).to.eql({
            type: ACTION_LOGOUT,
        })
    })

    it('should create an action to get user data', () => {
        expect(getUserData({
        })).to.eql({
            type: ACTION_GET_USER_DATA,
        })
    })
})
