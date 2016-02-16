import expect from 'expect.js'
import * as actions from '../../src/vocabulary/actions'
import * as actionTypes from '../../src/vocabulary/actionTypes'

describe('vocabulary actions', () => {
    it('should create an action to add vocabulary item', () => {
        const [phrase, translation] = ['item', 'translated-item']
        const expectedAction = {
            type: actionTypes.ADD_VOCABULARY_ITEM,
            phrase,
            translation,
        }
        expect(actions.addVocabularyItem(phrase, translation)).to.eql(expectedAction)
    })

    it('should create an action to remove vocabulary item', () => {
        const id = 'identifier'
        const expectedAction = {
            type: actionTypes.REMOVE_VOCABULARY_ITEM,
            id,
        }
        expect(actions.removeVocabularyItem(id)).to.eql(expectedAction)
    })
})
