import expect from 'expect.js'
import reducer from './flashcardsReducer'
import {
    ACTION_SET_CURRENT_FLASHCARD,
    ACTION_FLIP_CURRENT_FLASHCARD,
} from './actions'

describe('vocabulary flashcards reducer', () => {
    it('should return initial state', () => {
        expect(reducer(undefined, {})).to.be.eql({
            currentId: null,
            showFront: true,
        })
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
