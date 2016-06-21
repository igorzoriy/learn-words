import expect from 'expect.js'
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
        expect(reducer(undefined, {})).to.be.eql({
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
        expect(state.phrase).to.be('updated-phrase')
        expect(state.translation).to.be('updated-translation')
    })

    it('should handle ACTION_ADD_VOCABULARY_ITEM with STATUS_INIT', () => {
        const state = reducer(testInitialState, {
            type: ACTION_ADD_VOCABULARY_ITEM,
            status: STATUS_INIT,
        })
        expect(state.status).to.be(STATUS_INIT)
        expect(state.phrase).to.be('')
        expect(state.translation).to.be('')
        expect(state.errorMessage).to.be('')
        expect(state.successMessage).to.be('')
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
        expect(state.status).to.be(STATUS_REQUEST)
        expect(state.phrase).to.be('newphrase')
        expect(state.translation).to.be('newtranslation')
        expect(state.errorMessage).to.be('')
        expect(state.successMessage).to.be('')
    })

    it('should handle ACTION_ADD_VOCABULARY_ITEM with STATUS_FAILURE', () => {
        const state = reducer(testInitialState, {
            type: ACTION_ADD_VOCABULARY_ITEM,
            status: STATUS_FAILURE,
            data: {
                message: 'error message',
            },
        })
        expect(state.status).to.be(STATUS_FAILURE)
        expect(state.phrase).to.be('phrase')
        expect(state.translation).to.be('translation')
        expect(state.errorMessage).to.be('error message')
        expect(state.successMessage).to.be('')
    })

    it('should handle ACTION_ADD_VOCABULARY_ITEM with STATUS_SUCCESS', () => {
        const state = reducer(testInitialState, {
            type: ACTION_ADD_VOCABULARY_ITEM,
            status: STATUS_SUCCESS,
        })
        expect(state.status).to.be(STATUS_SUCCESS)
        expect(state.phrase).to.be('')
        expect(state.translation).to.be('')
        expect(state.errorMessage).to.be('')
        expect(state.successMessage).to.be('Item has beed saved successfully.')
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
        expect(state.status).to.be(STATUS_REQUEST)
        expect(state.phrase).to.be('newphrase')
        expect(state.translation).to.be('newtranslation')
        expect(state.errorMessage).to.be('')
        expect(state.successMessage).to.be('')
    })

    it('should handle ACTION_EDIT_VOCABULARY_ITEM with STATUS_FAILURE', () => {
        const state = reducer(testInitialState, {
            type: ACTION_EDIT_VOCABULARY_ITEM,
            status: STATUS_FAILURE,
            data: {
                message: 'error message',
            },
        })
        expect(state.status).to.be(STATUS_FAILURE)
        expect(state.phrase).to.be('phrase')
        expect(state.translation).to.be('translation')
        expect(state.errorMessage).to.be('error message')
        expect(state.successMessage).to.be('')
    })

    it('should handle ACTION_EDIT_VOCABULARY_ITEM with STATUS_SUCCESS', () => {
        const state = reducer(testInitialState, {
            type: ACTION_EDIT_VOCABULARY_ITEM,
            status: STATUS_SUCCESS,
        })
        expect(state.status).to.be(STATUS_SUCCESS)
        expect(state.phrase).to.be('phrase')
        expect(state.translation).to.be('translation')
        expect(state.errorMessage).to.be('')
        expect(state.successMessage).to.be('Item has beed updated successfully.')
    })

    it('should handle ACTION_FILL_VOCABULARY_FORM with STATUS_REQUEST', () => {
        const state = reducer(testInitialState, {
            type: ACTION_FILL_VOCABULARY_FORM,
            status: STATUS_REQUEST,
        })
        expect(state.status).to.be(STATUS_REQUEST)
        expect(state.phrase).to.be('')
        expect(state.translation).to.be('')
    })

    it('should handle ACTION_FILL_VOCABULARY_FORM with STATUS_REQUEST', () => {
        const state = reducer(testInitialState, {
            type: ACTION_FILL_VOCABULARY_FORM,
            status: STATUS_REQUEST,
        })
        expect(state.status).to.be(STATUS_REQUEST)
        expect(state.phrase).to.be('')
        expect(state.translation).to.be('')
        expect(state.errorMessage).to.be('')
        expect(state.successMessage).to.be('')
    })

    it('should handle ACTION_FILL_VOCABULARY_FORM with STATUS_FAILURE', () => {
        const state = reducer(testInitialState, {
            type: ACTION_FILL_VOCABULARY_FORM,
            status: STATUS_FAILURE,
            data: {
                message: 'denied',
            },
        })
        expect(state.status).to.be(STATUS_FAILURE)
        expect(state.errorMessage).to.be('denied')
        expect(state.successMessage).to.be('')

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
        expect(state.status).to.be(STATUS_SUCCESS)
        expect(state.phrase).to.be('fetched-phrase')
        expect(state.translation).to.be('fetched-translation')
        expect(state.errorMessage).to.be('')
        expect(state.successMessage).to.be('')
    })
})
