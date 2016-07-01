import expect from 'expect.js'
import reducer from './entitiesReducer'
import {
    ACTION_FETCH_VOCABULARY_ITEMS,
    ACTION_REMOVE_VOCABULARY_ITEM,
} from './actions'
import {
    STATUS_INIT,
    STATUS_REQUEST,
    STATUS_FAILURE,
    STATUS_SUCCESS,
} from '../api/constants'


const testIds = ['id1', 'id2', 'id3']
const testHash = {
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
}

describe('vocabulary entities reducer', () => {
    it('should return initial state', () => {
        expect(reducer(undefined, {})).to.be.eql({
            status: STATUS_INIT,
            ids: [],
            hash: {},
        })
    })

    it('should handle ACTION_FETCH_VOCABULARY_ITEMS with STATUS_REQUEST', () => {
        const state = reducer(undefined, {
            type: ACTION_FETCH_VOCABULARY_ITEMS,
            status: STATUS_REQUEST,
        })
        expect(state.status).to.be(STATUS_REQUEST)
    })

    it('should handle ACTION_FETCH_VOCABULARY_ITEMS with STATUS_FAILURE', () => {
        const state = reducer(undefined, {
            type: ACTION_FETCH_VOCABULARY_ITEMS,
            status: STATUS_FAILURE,
        })
        expect(state.status).to.be(STATUS_FAILURE)
    })

    it('should handle ACTION_FETCH_VOCABULARY_ITEMS with STATUS_SUCCESS', () => {
        let state = reducer(undefined, {
            type: ACTION_FETCH_VOCABULARY_ITEMS,
            status: STATUS_SUCCESS,
            data: testHash,
        })
        expect(state).to.be.eql({
            status: STATUS_SUCCESS,
            ids: testIds,
            hash: testHash,
        })

        state = reducer({
            ids: ['id0'],
            hash: {
                id0: {
                    phrase: 'phrase4',
                    translation: 'translation4',
                },
            },
        }, {
            type: ACTION_FETCH_VOCABULARY_ITEMS,
            status: STATUS_SUCCESS,
            data: testHash,
        })
        expect(state).to.be.eql({
            status: STATUS_SUCCESS,
            ids: ['id0', 'id1', 'id2', 'id3'],
            hash: {
                id0: {
                    phrase: 'phrase4',
                    translation: 'translation4',
                },
                ...testHash,
            },
        })
    })

    it('should handle ACTION_REMOVE_VOCABULARY_ITEM with STATUS_SUCCESS', () => {
        const initialState = {
            ids: testIds,
            hash: testHash,
        }

        const state = reducer(initialState, {
            type: ACTION_REMOVE_VOCABULARY_ITEM,
            status: STATUS_SUCCESS,
            params: {
                id: 'id2',
            },
        })
        expect(state.ids).to.not.contain('id2')
        expect(state.hash).to.not.have.property('id2')
    })
})
