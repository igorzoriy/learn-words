/*eslint no-magic-numbers: 0 */
import expect from 'expect.js'
import reducer from './reducer'
import {
    ACTION_INIT_FLASHCARDS,
    ACTION_SET_CURRENT_FLASHCARD,
    ACTION_FLIP_CURRENT_FLASHCARD,
} from './actions'

describe('vocabulary flashcards reducer', () => {
    it('should return initial state', () => {
        expect(reducer(undefined, {})).to.be.eql({
            currentId: null,
            ids: [],
            showFront: true,
        })
    })

    it('should handle ACTION_INIT_FLASHCARDS', () => {
        let state = reducer(undefined, {
            type: ACTION_INIT_FLASHCARDS,
            params: {
                ids: [2, 1, 3],
            },
        })
        expect(state.ids).to.eql([2, 1, 3])
        expect(state.currentId).to.be(2)
        expect(state.showFront).to.be(true)
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
