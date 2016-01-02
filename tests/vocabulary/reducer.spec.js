import expect from 'expect.js'
import Immutable from 'immutable'
import reducer from '../../src/vocabulary/reducer'
import * as actionTypes from '../../src/vocabulary/actionTypes'


describe('vocabulary reducer', () => {
    it('should return initial state', () => {
        expect(
            Immutable.is(reducer(undefined, {}),
            Immutable.List())
        ).to.be.true
    })

    it('should handle ADD_VOCABULARY_ITEM', () => {
        const [phrase, translation] = ['item', 'translated-item']
        const vocabulary = reducer(undefined, {
            type: actionTypes.ADD_VOCABULARY_ITEM,
            phrase,
            translation,
        })
        expect(vocabulary.size).to.be(1)
        expect(vocabulary.get(0).phrase).to.be(phrase)
        expect(vocabulary.get(0).translation).to.be(translation)
    })
})
