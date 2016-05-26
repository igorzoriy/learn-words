import expect from 'expect.js'
import { login, logout } from './actions'
import {
    ACTION_LOGIN,
    ACTION_LOGOUT,
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
})
