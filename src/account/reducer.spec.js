import reducer from './reducer'
import {
    ACTION_UPDATE_USER_DATA,
    ACTION_LOGIN,
    ACTION_LOGOUT,
} from './actions'
import {
    STATUS_SUCCESS,
} from '../api/constants'


describe('account reducer', () => {
    it('should return initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            isAnonymous: true,
            uid: null,
            error: '',
        })
    })

    it('should handle ACTION_UPDATE_USER_DATA', () => {
        const state = reducer(undefined, {
            type: ACTION_UPDATE_USER_DATA,
            data: {
                user: {
                    isAnonymous: false,
                    uid: 'unique-id1',
                },
            },
        })
        expect(state).toEqual({
            isAnonymous: false,
            uid: 'unique-id1',
            error: '',
        })
    })

    it('should handle ACTION_LOGIN', () => {
        const state = reducer(undefined, {
            type: ACTION_LOGIN,
            status: STATUS_SUCCESS,
            data: {
                user: {
                    isAnonymous: false,
                    uid: 'unique-id2',
                },
            },
        })
        expect(state).toEqual({
            isAnonymous: false,
            uid: 'unique-id2',
            error: '',
        })
    })

    it('should handle ACTION_LOGOUT', () => {
        const state = reducer(undefined, {
            type: ACTION_LOGOUT,
            status: STATUS_SUCCESS,
        })
        expect(state.uid).toBe(null)
    })
})
