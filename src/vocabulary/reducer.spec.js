import expect from 'expect.js'
import reducer from './reducer'
import {
    ACTION_GET_VOCABULARY_LIST,
    STATUS_INIT,
    STATUS_REQUEST,
    STATUS_SUCCESS,
    STATUS_FAILURE,
} from '../api/constants'

describe('vocabulary reducer', () => {
    it('should return initial state', () => {
        expect(reducer(undefined, {})).to.be.eql({
            list: {
                items: [],
                status: STATUS_INIT,
            },
        })
    })

    it('should handle ACTION_GET_VOCABULARY_LIST', () => {
        let state = reducer(undefined, {
            type: ACTION_GET_VOCABULARY_LIST,
            status: STATUS_REQUEST,
        })
        expect(state.list.status).to.be(STATUS_REQUEST)
        expect(state.list.items).to.be.eql([])

        state = reducer(undefined, {
            type: ACTION_GET_VOCABULARY_LIST,
            status: STATUS_FAILURE,
        })
        expect(state.list.status).to.be(STATUS_FAILURE)
        expect(state.list.items).to.be.eql([])

        state = reducer(undefined, {
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
})
