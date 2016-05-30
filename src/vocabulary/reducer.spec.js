import expect from 'expect.js'
import reducer from './reducer'
import {
    ACTION_GET_VOCABULARY_LIST,
    ACTION_ADD_VOCABULARY_ITEM,
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
            new: {
                status: STATUS_INIT,
                phrase: '',
                translation: '',
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

    it('should handle ACTION_ADD_VOCABULARY_ITEM', () => {
        // init
        let state = reducer(undefined, {
            type: ACTION_ADD_VOCABULARY_ITEM,
            status: STATUS_INIT,
        })
        expect(state.new.status).to.be(STATUS_INIT)
        expect(state.new.phrase).to.be('')
        expect(state.new.translation).to.be('')

        // request
        state = reducer(undefined, {
            type: ACTION_ADD_VOCABULARY_ITEM,
            status: STATUS_REQUEST,
            params: {
                phrase: 'phrase1',
                translation: 'translation1',
            },
        })
        expect(state.new.status).to.be(STATUS_REQUEST)
        expect(state.new.phrase).to.be('phrase1')
        expect(state.new.translation).to.be('translation1')

        // success
        state = reducer({
            new: {
                phrase: 'phrase2',
                translation: 'translation2',
            },
        }, {
            type: ACTION_ADD_VOCABULARY_ITEM,
            status: STATUS_SUCCESS,
        })
        expect(state.new.status).to.be(STATUS_SUCCESS)
        expect(state.new.phrase).to.be('')
        expect(state.new.translation).to.be('')

        // failure
        state = reducer({
            new: {
                phrase: 'phrase3',
                translation: 'translation3',
            },
        }, {
            type: ACTION_ADD_VOCABULARY_ITEM,
            status: STATUS_FAILURE,
        })
        expect(state.new.status).to.be(STATUS_FAILURE)
        expect(state.new.phrase).to.be('phrase3')
        expect(state.new.translation).to.be('translation3')
    })
})
