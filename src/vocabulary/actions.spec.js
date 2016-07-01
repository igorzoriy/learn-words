/*eslint no-magic-numbers: 0 */
import expect from 'expect.js'
import sinon from 'sinon'
import {
    ACTION_ADD_VOCABULARY_ITEM,
    ACTION_EDIT_VOCABULARY_ITEM,
    ACTION_REMOVE_VOCABULARY_ITEM,
    ACTION_CLEAR_VOCABULARITY_FORM,
    ACTION_UPDATE_VOCABULARY_FORM,
    ACTION_FILL_VOCABULARY_FORM,
    ACTION_FETCH_VOCABULARY_ITEMS,
    ACTION_SET_CURRENT_FLASHCARD,
    ACTION_FLIP_CURRENT_FLASHCARD,
    fetchVocabularyItems,
    getVocabularyItems,
    addVocabularyItem,
    editVocabularyItem,
    removeVocabularyItem,
    fillVocabularyForm,
    clearVocabularyform,
    updateVocabularyForm,
    setCurrentFlashcard,
    resetCurrentFlashcard,
    flipCurrentFlashcard,
    swipeCurrentFlashcard,
} from './actions'

describe('vocabulary actions', () => {
    it('should create an action to getch vocabulary list', () => {
        expect(fetchVocabularyItems()).to.eql({
            type: ACTION_FETCH_VOCABULARY_ITEMS,
        })
    })

    it('should create an action to get vocabulary list', () => {
        let dispatch = sinon.spy()
        let getStateService = (ids) => {
            return () => {
                return {
                    vocabulary: {
                        entities: {
                            ids,
                        },
                    },
                }
            }
        }
        getVocabularyItems()(dispatch, getStateService([]))
        expect(dispatch.args[0][0]).to.eql({
            type: ACTION_FETCH_VOCABULARY_ITEMS,
        })
        expect(dispatch.callCount).to.eql(1)
        getVocabularyItems()(dispatch, getStateService([1, 2, 3]))
        expect(dispatch.callCount).to.eql(1)
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

    it('should create an action to set current flashcard', () => {
        expect(setCurrentFlashcard('id')).to.eql({
            type: ACTION_SET_CURRENT_FLASHCARD,
            params: {
                id: 'id',
            },
        })
    })

    it('should create an action to reset current flashcard', () => {
        let getState = () => ({
            vocabulary: {
                entities: {
                    ids: [],
                },
            },
        })
        let dispatch = sinon.spy()
        resetCurrentFlashcard()(dispatch, getState)
        expect(dispatch.args[0][0]).to.eql({
            type: ACTION_SET_CURRENT_FLASHCARD,
            params: {
                id: null,
            },
        })

        getState = () => ({
            vocabulary: {
                entities: {
                    ids: ['id1', 'id2'],
                },
            },
        })
        dispatch = sinon.spy()
        resetCurrentFlashcard()(dispatch, getState)
        expect(dispatch.args[0][0]).to.eql({
            type: ACTION_SET_CURRENT_FLASHCARD,
            params: {
                id: 'id1',
            },
        })
    })

    it('should create an action to flip current flashcard', () => {
        expect(flipCurrentFlashcard()).to.eql({
            type: ACTION_FLIP_CURRENT_FLASHCARD,
        })
    })

    it('should create an action to swipe current flashcard', () => {
        let getState = () => ({
            vocabulary: {
                entities: {
                    ids: ['id1', 'id2', 'id3'],
                    hash: {
                        id1: {
                            phrase: 'phrase1',
                            translation: 'translation1',
                        },
                        id2: {
                            phrase: 'phrase2',
                            translation: 'translation2',
                        },
                        id3: {
                            phrase: 'phrase3',
                            translation: 'translation3',
                        },
                    },
                },
                flashcards: {
                    currentId: 'id2',
                },
            },
        })
        let dispatch = sinon.spy()
        swipeCurrentFlashcard()(dispatch, getState)
        expect(dispatch.args[0][0]).to.eql({
            type: ACTION_SET_CURRENT_FLASHCARD,
            params: {
                id: 'id3',
            },
        })
    })
})
