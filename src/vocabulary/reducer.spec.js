/* eslint no-magic-numbers: 0 */
import expect from 'expect.js'
import reducer from './reducer'
import {
    ACTION_GET_VOCABULARY_LIST,
    ACTION_ADD_VOCABULARY_ITEM,
    ACTION_REMOVE_VOCABULARY_ITEM,
    STATUS_INIT,
    STATUS_REQUEST,
    STATUS_SUCCESS,
    STATUS_FAILURE,
} from '../api/constants'

const testInitialState = {
    list: {
        items: [
            {
                id: 'id1',
                phrase: 'phrase1',
                translation: 'translation1',
            },
            {
                id: 'id2',
                phrase: 'phrase2',
                translation: 'translation2',
            },
            {
                id: 'id3',
                phrase: 'phrase3',
                translation: 'translation3',
            },
        ],
        status: STATUS_INIT,
    },
    new: {
        status: STATUS_INIT,
        phrase: 'phrase',
        translation: 'translation',
    },
}

describe('vocabulary reducer', () => {
    it('should return initial state', () => {
        expect(reducer(undefined, {})).to.be.eql({
            list: {
                items: [],
                status: STATUS_INIT,
            },
            new: {
                status: STATUS_INIT,
                phrase: '',
                translation: '',
            },
        })
    })

    it('should handle ACTION_GET_VOCABULARY_LIST with STATUS_REQUEST', () => {
        const state = reducer(testInitialState, {
            type: ACTION_GET_VOCABULARY_LIST,
            status: STATUS_REQUEST,
        })
        expect(state.list.status).to.be(STATUS_REQUEST)
        expect(state.list.items).to.be.eql([])
    })

    it('should handle ACTION_GET_VOCABULARY_LIST with STATUS_FAILURE', () => {
        const state = reducer(testInitialState, {
            type: ACTION_GET_VOCABULARY_LIST,
            status: STATUS_FAILURE,
        })
        expect(state.list.status).to.be(STATUS_FAILURE)
        expect(state.list.items).to.be.eql([])
    })

    it('should handle ACTION_GET_VOCABULARY_LIST with STATUS_SUCCESS', () => {
        const state = reducer(testInitialState, {
            type: ACTION_GET_VOCABULARY_LIST,
            status: STATUS_SUCCESS,
            data: {
                id1: {
                    phrase: 'phrase1',
                    translation: 'translation1',
                },
                id2: {
                    phrase: 'phrase2',
                    translation: 'translation2',
                },
            },
        })
        expect(state.list.status).to.be(STATUS_SUCCESS)
        expect(state.list.items).to.be.eql([
            {
                id: 'id1',
                phrase: 'phrase1',
                translation: 'translation1',
            },
            {
                id: 'id2',
                phrase: 'phrase2',
                translation: 'translation2',
            },
        ])
    })

    it('should handle ACTION_REMOVE_VOCABULARY_ITEM with STATUS_SUCCESS', () => {
        expect(testInitialState.list.items.length).to.be(3)
        const state = reducer(testInitialState, {
            type: ACTION_REMOVE_VOCABULARY_ITEM,
            status: STATUS_SUCCESS,
            params: {
                id: 'id2',
            },
        })
        expect(state.list.items.length).to.be(2)
    })

    it('should handle ACTION_ADD_VOCABULARY_ITEM with STATUS_INIT', () => {
        const state = reducer(testInitialState, {
            type: ACTION_ADD_VOCABULARY_ITEM,
            status: STATUS_INIT,
        })
        expect(state.new.status).to.be(STATUS_INIT)
        expect(state.new.phrase).to.be('')
        expect(state.new.translation).to.be('')
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
        expect(state.new.status).to.be(STATUS_REQUEST)
        expect(state.new.phrase).to.be('newphrase')
        expect(state.new.translation).to.be('newtranslation')
    })

    it('should handle ACTION_ADD_VOCABULARY_ITEM with STATUS_SUCCESS', () => {
        const state = reducer(testInitialState, {
            type: ACTION_ADD_VOCABULARY_ITEM,
            status: STATUS_SUCCESS,
        })
        expect(state.new.status).to.be(STATUS_SUCCESS)
        expect(state.new.phrase).to.be('')
        expect(state.new.translation).to.be('')
    })

    it('should handle ACTION_ADD_VOCABULARY_ITEM with STATUS_FAILURE', () => {
        const state = reducer(testInitialState, {
            type: ACTION_ADD_VOCABULARY_ITEM,
            status: STATUS_FAILURE,
        })
        expect(state.new.status).to.be(STATUS_FAILURE)
        expect(state.new.phrase).to.be('phrase')
        expect(state.new.translation).to.be('translation')
    })
})
