import expect from 'expect.js'
import reducer from './reducer'
import {
    ACTION_UPDATE_USER_DATA,
    ACTION_LOGIN,
    ACTION_LOGOUT,
    STATUS_SUCCESS,
} from '../api/constants'


describe('account reducer', () => {
    it('should return initial state', () => {
        expect(reducer(undefined, {})).to.be.eql({
            uid: null,
            error: '',
        })
    })

    it('should handle ACTION_UPDATE_USER_DATA', () => {
        const state = reducer(undefined, {
            type: ACTION_UPDATE_USER_DATA,
            data: {
                user: {
                    uid: 'unique-id',
                },
            },
        })
        expect(state.uid).to.be('unique-id')
    })

    it('should handle ACTION_LOGIN', () => {
        const state = reducer(undefined, {
            type: ACTION_LOGIN,
            status: STATUS_SUCCESS,
            data: {
                user: {
                    uid: 'unique-id',
                },
            },
        })
        expect(state.uid).to.be('unique-id')
    })

    it('should handle ACTION_LOGOUT', () => {
        const state = reducer(undefined, {
            type: ACTION_LOGOUT,
            status: STATUS_SUCCESS,
        })
        expect(state.uid).to.be(null)
    })
})
