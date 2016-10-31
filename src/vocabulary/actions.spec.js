/*eslint no-magic-numbers: 0 */
import {
    ACTION_ADD_VOCABULARY_ITEM,
    ACTION_EDIT_VOCABULARY_ITEM,
    ACTION_REMOVE_VOCABULARY_ITEM,
    ACTION_CLEAR_VOCABULARITY_FORM,
    ACTION_UPDATE_VOCABULARY_FORM,
    ACTION_FILL_VOCABULARY_FORM,
    ACTION_FETCH_VOCABULARY_ITEMS,
    fetchVocabularyItems,
    getVocabularyItems,
    addVocabularyItem,
    editVocabularyItem,
    removeVocabularyItem,
    fillVocabularyForm,
    clearVocabularyform,
    updateVocabularyForm,
} from './actions'
import { STATUS_INIT, STATUS_SUCCESS } from '../api/constants'

describe('vocabulary actions', () => {
    it('should create an action to fetch vocabulary list', () => {
        expect(fetchVocabularyItems()).toEqual({
            type: ACTION_FETCH_VOCABULARY_ITEMS,
        })
    })

    it('should create an action to get vocabulary list', () => {
        let dispatch = jest.fn()
        let getStateService = (ids, status) => {
            return () => {
                return {
                    vocabulary: {
                        entities: {
                            ids,
                            status,
                        },
                    },
                }
            }
        }
        getVocabularyItems()(dispatch, getStateService([], STATUS_INIT))
        expect(dispatch.mock.calls[0][0]).toEqual({
            type: ACTION_FETCH_VOCABULARY_ITEMS,
        })
        expect(dispatch).toHaveBeenCalledTimes(1)
        getVocabularyItems()(dispatch, getStateService([1, 2, 3], STATUS_SUCCESS))
        expect(dispatch).toHaveBeenCalledTimes(1)
        getVocabularyItems()(dispatch, getStateService([], STATUS_SUCCESS))
        expect(dispatch).toHaveBeenCalledTimes(1)
    })

    it('should create an action to add vocabulary item', () => {
        expect(addVocabularyItem('foo', 'bar')).toEqual({
            type: ACTION_ADD_VOCABULARY_ITEM,
            params: {
                phrase: 'foo',
                translation: 'bar',
            },
        })
    })

    it('should create an action to edit vocabulary item', () => {
        expect(editVocabularyItem('id', 'foo', 'bar')).toEqual({
            type: ACTION_EDIT_VOCABULARY_ITEM,
            params: {
                id: 'id',
                phrase: 'foo',
                translation: 'bar',
            },
        })
    })

    it('should create an action to remove vocabulary item', () => {
        expect(removeVocabularyItem('id1')).toEqual({
            type: ACTION_REMOVE_VOCABULARY_ITEM,
            params: {
                id: 'id1',
            },
        })
    })

    it('should create an action to fill vocabulary form', () => {
        expect(fillVocabularyForm('id2')).toEqual({
            type: ACTION_FILL_VOCABULARY_FORM,
            params: {
                id: 'id2',
            },
        })
    })

    it('should create an action to clear vocabulary form', () => {
        expect(clearVocabularyform()).toEqual({
            type: ACTION_CLEAR_VOCABULARITY_FORM,
        })
    })

    it('should create an action to update vocabulary form', () => {
        expect(updateVocabularyForm('foo2', 'bar2')).toEqual({
            type: ACTION_UPDATE_VOCABULARY_FORM,
            params: {
                phrase: 'foo2',
                translation: 'bar2',
            },
        })
    })
})
