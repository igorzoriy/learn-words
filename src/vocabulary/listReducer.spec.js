import expect from 'expect.js'
import reducer from './listReducer'
import {
    ACTION_FETCH_VOCABULARY_ITEMS,
} from './actions'
import {
    STATUS_INIT,
    STATUS_REQUEST,
    STATUS_SUCCESS,
    STATUS_FAILURE,
} from '../api/constants'

describe('vocabulary list reducer', () => {
    it('should return initial state', () => {
        expect(reducer(undefined, {})).to.be.eql({
            status: STATUS_INIT,
        })
    })

    it('should handle ACTION_FETCH_VOCABULARY_ITEMS with STATUS_REQUEST', () => {
        const state = reducer(undefined, {
            type: ACTION_FETCH_VOCABULARY_ITEMS,
            status: STATUS_REQUEST,
        })
        expect(state.status).to.be(STATUS_REQUEST)
    })

    it('should handle ACTION_FETCH_VOCABULARY_ITEMS with STATUS_FAILURE', () => {
        const state = reducer(undefined, {
            type: ACTION_FETCH_VOCABULARY_ITEMS,
            status: STATUS_FAILURE,
        })
        expect(state.status).to.be(STATUS_FAILURE)
    })

    it('should handle ACTION_FETCH_VOCABULARY_ITEMS with STATUS_SUCCESS', () => {
        const state = reducer(undefined, {
            type: ACTION_FETCH_VOCABULARY_ITEMS,
            status: STATUS_SUCCESS,
        })
        expect(state.status).to.be(STATUS_SUCCESS)
    })
})
