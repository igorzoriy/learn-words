import expect from 'expect.js'
import reducer from './reducer'
import {
    ACTION_INIT_PHRASE_TRANSLATION_EXERCISE,
} from './actions'


describe('exercises reducer', () => {
    it('should return initial state', () => {
        expect(reducer(undefined, {})).to.be.eql({
            items: [],
            currentIndex: 0,
        })
    })

    it('should handle ACTION_INIT_PHRASE_TRANSLATION_EXERCISE', () => {
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
        /*eslint no-magic-numbers: 0 */
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
})
