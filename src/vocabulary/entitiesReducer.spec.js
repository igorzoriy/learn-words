import expect from 'expect.js'
import reducer from './entitiesReducer'
import {
    ACTION_GET_VOCABULARY_ITEMS,
    ACTION_REMOVE_VOCABULARY_ITEM,
} from './actions'
import {
    STATUS_REQUEST,
    STATUS_SUCCESS,
    STATUS_FAILURE,
} from '../api/constants'

const data = {
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
        expect(reducer(undefined, {})).to.be.eql({})
    })

    it('should handle ACTION_GET_VOCABULARY_ITEMS with STATUS_REQUEST', () => {
        const state = reducer(undefined, {
            type: ACTION_GET_VOCABULARY_ITEMS,
            status: STATUS_REQUEST,
        })
        expect(state).to.be.eql({})
    })

    it('should handle ACTION_GET_VOCABULARY_ITEMS with STATUS_FAILURE', () => {
        const state = reducer(undefined, {
            type: ACTION_GET_VOCABULARY_ITEMS,
            status: STATUS_FAILURE,
        })
        expect(state).to.be.eql({})
    })

    it('should handle ACTION_GET_VOCABULARY_ITEMS with STATUS_SUCCESS', () => {
        const state = reducer(undefined, {
            type: ACTION_GET_VOCABULARY_ITEMS,
            status: STATUS_SUCCESS,
            data,
        })
        expect(state).to.be.eql(data)
    })

    it('should handle ACTION_REMOVE_VOCABULARY_ITEM with STATUS_SUCCESS', () => {
        expect(data.id2).to.be.an('object')
        const state = reducer(data, {
            type: ACTION_REMOVE_VOCABULARY_ITEM,
            status: STATUS_SUCCESS,
            params: {
                id: 'id2',
            },
        })
        expect(state.id2).to.not.be.an('object')
    })
})
