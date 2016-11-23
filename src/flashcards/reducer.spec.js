import reducer from './reducer'
import {
    ACTION_INIT_FLASHCARDS,
    ACTION_SET_CURRENT_FLASHCARD,
    ACTION_FLIP_CURRENT_FLASHCARD,
} from './actions'

describe('vocabulary flashcards reducer', () => {
    it('should return initial state', () => {
        expect(reducer(undefined, {})).toEqual({
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
        expect(state.ids).toEqual([2, 1, 3])
        expect(state.currentId).toBe(2)
        expect(state.showFront).toBe(true)
    })

    it('should handle ACTION_SET_CURRENT_FLASHCARD', () => {
        const state = reducer(undefined, {
            type: ACTION_SET_CURRENT_FLASHCARD,
            params: {
                id: 'id1',
            },
        })
        expect(state.currentId).toBe('id1')
    })

    it('should handle ACTION_FLIP_CURRENT_FLASHCARD', () => {
        let state = reducer(undefined, {
            type: ACTION_FLIP_CURRENT_FLASHCARD,
        })
        expect(state.showFront).toBe(false)

        state = reducer({
            showFront: false,
        }, {
            type: ACTION_FLIP_CURRENT_FLASHCARD,
        })
        expect(state.showFront).toBe(true)
    })
})
