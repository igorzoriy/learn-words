import expect from 'expect.js'
import { getVocabularyList, addVocabularyItem, removeVocabularyItem } from './actions'
import {
    ACTION_GET_VOCABULARY_LIST,
    ACTION_ADD_VOCABULARY_ITEM,
    ACTION_REMOVE_VOCABULARY_ITEM,
} from '../api/constants'

describe('vocabulary actions', () => {
    it('should create an action to get vocabulary list', () => {
        expect(getVocabularyList()).to.eql({
            type: ACTION_GET_VOCABULARY_LIST,
        })
    })

    it('should create an action to add vocabulary item', () => {
        expect(addVocabularyItem('foo', 'bar')).to.eql({
            type: ACTION_ADD_VOCABULARY_ITEM,
            params: {
                phrase: 'foo',
                translation: 'bar',
            },
        })
    })

    it('should create an action to remove vocabulary item', () => {
        expect(removeVocabularyItem('id')).to.eql({
            type: ACTION_REMOVE_VOCABULARY_ITEM,
            params: {
                id: 'id',
            },
        })
    })
})
