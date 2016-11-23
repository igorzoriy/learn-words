/*eslint no-magic-numbers: 0 */
import reducer from './reducer'
import {
    ACTION_INIT_PHRASE_TRANSLATION_EXERCISE,
    ACTION_ADD_ANSWER,
    ACTION_MOVE_TO_NEXT_QUESTION,
} from './actions'

let items

describe('exercises reducer', () => {
    beforeEach(() => {
        items = [
            {
                id: 2,
                items: [1, 2, 3, 4],
                answer: null,
            },
            {
                id: 1,
                items: [1, 2, 3, 4],
                answer: null,
            },
            {
                id: 4,
                items: [1, 2, 3, 4],
                answer: null,
            },
            {
                id: 3,
                items: [1, 2, 3, 4],
                answer: null,
            },
        ]
    })

    it('should return initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            items: [],
            currentIndex: 0,
            currentId: null,
        })
    })

    it('should handle ACTION_INIT_PHRASE_TRANSLATION_EXERCISE', () => {
        let state = reducer(undefined, {
            type: ACTION_INIT_PHRASE_TRANSLATION_EXERCISE,
            params: {
                items,
            },
        })
        expect(state.items).toEqual(items)
        expect(state.currentIndex).toBe(0)
        expect(state.currentId).toBe(2)
    })

    it('should handle ACTION_ADD_ANSWER', () => {
        let state = reducer({
            items,
        }, {
            type: ACTION_ADD_ANSWER,
            params: {
                id: 1,
                variantId: 1,
            },
        })
        state = reducer(state, {
            type: ACTION_ADD_ANSWER,
            params: {
                id: 3,
                variantId: 3,
            },
        })
        expect(state.items).not.toEqual(items)
        expect(state.items.find(({id}) => id === 1).answer).toBe(1)
        expect(state.items.find(({id}) => id === 3).answer).toBe(3)
    })

    it('should handle ACTION_MOVE_TO_NEXT_QUESTION', () => {
        let state = reducer({
            items,
        }, {
            type: ACTION_MOVE_TO_NEXT_QUESTION,
            params: {
                index: 2,
            },
        })
        expect(state.currentIndex).toBe(2)
        expect(state.currentId).toBe(4)
    })
})
