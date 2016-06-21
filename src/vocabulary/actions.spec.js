import expect from 'expect.js'
import {
    ACTION_ADD_VOCABULARY_ITEM,
    ACTION_EDIT_VOCABULARY_ITEM,
    ACTION_REMOVE_VOCABULARY_ITEM,
    ACTION_CLEAR_VOCABULARITY_FORM,
    ACTION_UPDATE_VOCABULARY_FORM,
    ACTION_FILL_VOCABULARY_FORM,
    ACTION_GET_VOCABULARY_ITEMS,
    getVocabularyItems,
    addVocabularyItem,
    editVocabularyItem,
    removeVocabularyItem,
    fillVocabularyForm,
    clearVocabularyform,
    updateVocabularyForm,
} from './actions'

describe('vocabulary actions', () => {
    it('should create an action to get vocabulary list', () => {
        expect(getVocabularyItems()).to.eql({
            type: ACTION_GET_VOCABULARY_ITEMS,
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

    it('should create an action to edit vocabulary item', () => {
        expect(editVocabularyItem('id', 'foo', 'bar')).to.eql({
            type: ACTION_EDIT_VOCABULARY_ITEM,
            params: {
                id: 'id',
                phrase: 'foo',
                translation: 'bar',
            },
        })
    })

    it('should create an action to remove vocabulary item', () => {
        expect(removeVocabularyItem('id1')).to.eql({
            type: ACTION_REMOVE_VOCABULARY_ITEM,
            params: {
                id: 'id1',
            },
        })
    })

    it('should create an action to fill vocabulary form', () => {
        expect(fillVocabularyForm('id2')).to.eql({
            type: ACTION_FILL_VOCABULARY_FORM,
            params: {
                id: 'id2',
            },
        })
    })

    it('should create an action to clear vocabulary form', () => {
        expect(clearVocabularyform()).to.eql({
            type: ACTION_CLEAR_VOCABULARITY_FORM,
        })
    })

    it('should create an action to update vocabulary form', () => {
        expect(updateVocabularyForm('foo2', 'bar2')).to.eql({
            type: ACTION_UPDATE_VOCABULARY_FORM,
            params: {
                phrase: 'foo2',
                translation: 'bar2',
            },
        })
    })
})
