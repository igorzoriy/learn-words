import expect from 'expect.js'
import { getVocabularyList } from './actions'
import {
    ACTION_GET_VOCABULARY_LIST,
} from '../api/constants'

describe('vocabulary actions', () => {
    it('should create an action to get vocabulary list', () => {
        expect(getVocabularyList({
        })).to.eql({
            type: ACTION_GET_VOCABULARY_LIST,
        })
    })
})
