import reducer from './formReducer'
import {
    ACTION_UPDATE_VOCABULARY_FORM,
    ACTION_FILL_VOCABULARY_FORM,
    ACTION_ADD_VOCABULARY_ITEM,
    ACTION_EDIT_VOCABULARY_ITEM,
} from './actions'
import {
    STATUS_INIT,
    STATUS_REQUEST,
    STATUS_SUCCESS,
    STATUS_FAILURE,
} from '../api/constants'

const testInitialState = {
    status: STATUS_INIT,
    phrase: 'phrase',
    translation: 'translation',
    errorMessage: 'error',
    successMessage: 'success',
}

describe('vocabulary form reducer', () => {
    it('should return initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            status: STATUS_INIT,
            phrase: '',
            translation: '',
            errorMessage: '',
            successMessage: '',
        })
    })

    it('should handle ACTION_UPDATE_VOCABULARY_FORM', () => {
        const state = reducer(testInitialState, {
            type: ACTION_UPDATE_VOCABULARY_FORM,
            params: {
                phrase: 'updated-phrase',
                translation: 'updated-translation',
            },
        })
        expect(state.phrase).toBe('updated-phrase')
        expect(state.translation).toBe('updated-translation')
    })

    it('should handle ACTION_ADD_VOCABULARY_ITEM with STATUS_INIT', () => {
        const state = reducer(testInitialState, {
            type: ACTION_ADD_VOCABULARY_ITEM,
            status: STATUS_INIT,
        })
        expect(state.status).toBe(STATUS_INIT)
        expect(state.phrase).toBe('')
        expect(state.translation).toBe('')
        expect(state.errorMessage).toBe('')
        expect(state.successMessage).toBe('')
    })

    it('should handle ACTION_ADD_VOCABULARY_ITEM with STATUS_REQUEST', () => {
        const state = reducer(testInitialState, {
            type: ACTION_ADD_VOCABULARY_ITEM,
            status: STATUS_REQUEST,
            params: {
                phrase: 'newphrase',
                translation: 'newtranslation',
            },
        })
        expect(state.status).toBe(STATUS_REQUEST)
        expect(state.phrase).toBe('newphrase')
        expect(state.translation).toBe('newtranslation')
        expect(state.errorMessage).toBe('')
        expect(state.successMessage).toBe('')
    })

    it('should handle ACTION_ADD_VOCABULARY_ITEM with STATUS_FAILURE', () => {
        const state = reducer(testInitialState, {
            type: ACTION_ADD_VOCABULARY_ITEM,
            status: STATUS_FAILURE,
            data: {
                message: 'error message',
            },
        })
        expect(state.status).toBe(STATUS_FAILURE)
        expect(state.phrase).toBe('phrase')
        expect(state.translation).toBe('translation')
        expect(state.errorMessage).toBe('error message')
        expect(state.successMessage).toBe('')
    })

    it('should handle ACTION_ADD_VOCABULARY_ITEM with STATUS_SUCCESS', () => {
        const state = reducer(testInitialState, {
            type: ACTION_ADD_VOCABULARY_ITEM,
            status: STATUS_SUCCESS,
        })
        expect(state.status).toBe(STATUS_SUCCESS)
        expect(state.phrase).toBe('')
        expect(state.translation).toBe('')
        expect(state.errorMessage).toBe('')
        expect(state.successMessage).toBe('Item has beed saved successfully.')
    })

    it('should handle ACTION_EDIT_VOCABULARY_ITEM with STATUS_REQUEST', () => {
        const state = reducer(testInitialState, {
            type: ACTION_EDIT_VOCABULARY_ITEM,
            status: STATUS_REQUEST,
            params: {
                phrase: 'newphrase',
                translation: 'newtranslation',
            },
        })
        expect(state.status).toBe(STATUS_REQUEST)
        expect(state.phrase).toBe('newphrase')
        expect(state.translation).toBe('newtranslation')
        expect(state.errorMessage).toBe('')
        expect(state.successMessage).toBe('')
    })

    it('should handle ACTION_EDIT_VOCABULARY_ITEM with STATUS_FAILURE', () => {
        const state = reducer(testInitialState, {
            type: ACTION_EDIT_VOCABULARY_ITEM,
            status: STATUS_FAILURE,
            data: {
                message: 'error message',
            },
        })
        expect(state.status).toBe(STATUS_FAILURE)
        expect(state.phrase).toBe('phrase')
        expect(state.translation).toBe('translation')
        expect(state.errorMessage).toBe('error message')
        expect(state.successMessage).toBe('')
    })

    it('should handle ACTION_EDIT_VOCABULARY_ITEM with STATUS_SUCCESS', () => {
        const state = reducer(testInitialState, {
            type: ACTION_EDIT_VOCABULARY_ITEM,
            status: STATUS_SUCCESS,
        })
        expect(state.status).toBe(STATUS_SUCCESS)
        expect(state.phrase).toBe('phrase')
        expect(state.translation).toBe('translation')
        expect(state.errorMessage).toBe('')
        expect(state.successMessage).toBe('Item has beed updated successfully.')
    })

    it('should handle ACTION_FILL_VOCABULARY_FORM with STATUS_REQUEST', () => {
        const state = reducer(testInitialState, {
            type: ACTION_FILL_VOCABULARY_FORM,
            status: STATUS_REQUEST,
        })
        expect(state.status).toBe(STATUS_REQUEST)
        expect(state.phrase).toBe('')
        expect(state.translation).toBe('')
    })

    it('should handle ACTION_FILL_VOCABULARY_FORM with STATUS_REQUEST', () => {
        const state = reducer(testInitialState, {
            type: ACTION_FILL_VOCABULARY_FORM,
            status: STATUS_REQUEST,
        })
        expect(state.status).toBe(STATUS_REQUEST)
        expect(state.phrase).toBe('')
        expect(state.translation).toBe('')
        expect(state.errorMessage).toBe('')
        expect(state.successMessage).toBe('')
    })

    it('should handle ACTION_FILL_VOCABULARY_FORM with STATUS_FAILURE', () => {
        const state = reducer(testInitialState, {
            type: ACTION_FILL_VOCABULARY_FORM,
            status: STATUS_FAILURE,
            data: {
                message: 'denied',
            },
        })
        expect(state.status).toBe(STATUS_FAILURE)
        expect(state.errorMessage).toBe('denied')
        expect(state.successMessage).toBe('')

    })

    it('should handle ACTION_FILL_VOCABULARY_FORM with STATUS_SUCCESS', () => {
        const state = reducer(testInitialState, {
            type: ACTION_FILL_VOCABULARY_FORM,
            status: STATUS_SUCCESS,
            data: {
                phrase: 'fetched-phrase',
                translation: 'fetched-translation',
            },
        })
        expect(state.status).toBe(STATUS_SUCCESS)
        expect(state.phrase).toBe('fetched-phrase')
        expect(state.translation).toBe('fetched-translation')
        expect(state.errorMessage).toBe('')
        expect(state.successMessage).toBe('')
    })
})
