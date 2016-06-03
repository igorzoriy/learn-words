/* eslint no-magic-numbers: 0 */
import expect from 'expect.js'
import reducer from './listReducer'
import {
    ACTION_GET_VOCABULARY_LIST,
    ACTION_REMOVE_VOCABULARY_ITEM,
    STATUS_INIT,
    STATUS_REQUEST,
    STATUS_SUCCESS,
    STATUS_FAILURE,
} from '../api/constants'

const testInitialState = {
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
}

describe('vocabulary list reducer', () => {
    it('should return initial state', () => {
        expect(reducer(undefined, {})).to.be.eql({
            items: [],
            status: STATUS_INIT,
        })
    })

    it('should handle ACTION_GET_VOCABULARY_LIST with STATUS_REQUEST', () => {
        const state = reducer(testInitialState, {
            type: ACTION_GET_VOCABULARY_LIST,
            status: STATUS_REQUEST,
        })
        expect(state.status).to.be(STATUS_REQUEST)
        expect(state.items).to.be.eql([])
    })

    it('should handle ACTION_GET_VOCABULARY_LIST with STATUS_FAILURE', () => {
        const state = reducer(testInitialState, {
            type: ACTION_GET_VOCABULARY_LIST,
            status: STATUS_FAILURE,
        })
        expect(state.status).to.be(STATUS_FAILURE)
        expect(state.items).to.be.eql([])
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
        expect(state.status).to.be(STATUS_SUCCESS)
        expect(state.items).to.be.eql([
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
        expect(testInitialState.items.length).to.be(3)
        const state = reducer(testInitialState, {
            type: ACTION_REMOVE_VOCABULARY_ITEM,
            status: STATUS_SUCCESS,
            params: {
                id: 'id2',
            },
        })
        expect(state.items.length).to.be(2)
    })
})
