import expect from 'expect.js'
import reducer from './flashcardsReducer'
import {
    ACTION_FETCH_VOCABULARY_ITEMS,
    ACTION_SET_CURRENT_FLASHCARD,
    ACTION_FLIP_CURRENT_FLASHCARD,
} from './actions'
import {
    STATUS_INIT,
    STATUS_REQUEST,
    STATUS_SUCCESS,
    STATUS_FAILURE,
} from '../api/constants'

describe('vocabulary flashcards reducer', () => {
    it('should return initial state', () => {
        expect(reducer(undefined, {})).to.be.eql({
            status: STATUS_INIT,
            currentId: null,
            showFront: true,
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

    it('should handle ACTION_SET_CURRENT_FLASHCARD', () => {
        const state = reducer(undefined, {
            type: ACTION_SET_CURRENT_FLASHCARD,
            params: {
                id: 'id1',
            },
        })
        expect(state.currentId).to.be('id1')
    })

    it('should handle ACTION_FLIP_CURRENT_FLASHCARD', () => {
        let state = reducer(undefined, {
            type: ACTION_FLIP_CURRENT_FLASHCARD,
        })
        expect(state.showFront).to.be(false)

        state = reducer({
            showFront: false,
        }, {
            type: ACTION_FLIP_CURRENT_FLASHCARD,
        })
        expect(state.showFront).to.be(true)
    })
})
