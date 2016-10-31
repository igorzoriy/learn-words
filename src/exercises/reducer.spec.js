/*eslint no-magic-numbers: 0 */
import expect from 'expect.js'
import reducer from './reducer'
import {
    ACTION_INIT_PHRASE_TRANSLATION_EXERCISE,
    ACTION_ADD_ANSWER,
    ACTION_MOVE_TO_NEXT_QUESTION,
} from './actions'

let items = [
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

describe('exercises reducer', () => {
    it('should return initial state', () => {
        expect(reducer(undefined, {})).to.be.eql({
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
        expect(state.items).to.eql(items)
        expect(state.currentIndex).to.be(0)
        expect(state.currentId).to.be(2)
    })

    it('should handle ACTION_ADD_ANSWER', () => {
        let state = reducer({
            items,
        }, {
            type: ACTION_ADD_ANSWER,
            params: {
                id: 1,
                variantId: 2,
            },
        })
        expect(state.items).not.to.eql(items)
        expect(state.items[1].answer).to.be(2)
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
        expect(state.currentIndex).to.be(2)
        expect(state.currentId).to.be(4)
    })
})
