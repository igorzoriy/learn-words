import expect from 'expect.js'
import reducer from './reducer'
import {
    ACTION_GET_USER_DATA,
    ACTION_LOGIN,
    ACTION_LOGOUT,
    STATUS_SUCCESS,
} from '../api/constants'


describe('account reducer', () => {
    it('should return initial state', () => {
        expect(reducer(undefined, {})).to.be.eql({
            uid: null,
        })
    })

    it('should handle ACTION_GET_USER_DATA', () => {
        const state = reducer(undefined, {
            type: ACTION_GET_USER_DATA,
            data: {
                uid: 'unique-id',
            },
        })
        expect(state.uid).to.be('unique-id')
    })

    it('should handle ACTION_LOGIN', () => {
        const state = reducer(undefined, {
            type: ACTION_LOGIN,
            status: STATUS_SUCCESS,
            data: {
                uid: 'unique-id',
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
