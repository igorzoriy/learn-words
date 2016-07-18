/*eslint no-magic-numbers: 0 */
import expect from 'expect.js'
import sinon from 'sinon'
import {
    ACTION_INIT_FLASHCARDS,
    ACTION_SET_CURRENT_FLASHCARD,
    ACTION_FLIP_CURRENT_FLASHCARD,
    initFlashcards,
    setCurrentFlashcard,
    flipCurrentFlashcard,
    swipeCurrentFlashcard,
} from './actions'

describe('flashcards actions', () => {
    it('should create an action to init flashcards', () => {
        let getState = () => ({
            vocabulary: {
                entities: {
                    ids: [],
                },
            },
        })
        let dispatch = sinon.spy()
        initFlashcards()(dispatch, getState)
        expect(dispatch.args[0][0]).to.eql({
            type: ACTION_INIT_FLASHCARDS,
            params: {
                ids: [],
            },
        })

        getState = () => ({
            vocabulary: {
                entities: {
                    ids: ['id1', 'id2'],
                },
            },
        })
        dispatch = sinon.spy()
        initFlashcards()(dispatch, getState)
        let result = dispatch.args[0][0]
        expect(result.type).to.be(ACTION_INIT_FLASHCARDS)
        expect(result.params.ids.sort()).to.eql(['id1', 'id2'])
    })

    it('should create an action to set current flashcard', () => {
        expect(setCurrentFlashcard('id')).to.eql({
            type: ACTION_SET_CURRENT_FLASHCARD,
            params: {
                id: 'id',
            },
        })
    })

    it('should create an action to flip current flashcard', () => {
        expect(flipCurrentFlashcard()).to.eql({
            type: ACTION_FLIP_CURRENT_FLASHCARD,
        })
    })

    it('should create an action to swipe current flashcard', () => {
        let getState = () => ({
            flashcards: {
                currentId: 'id2',
                ids: ['id1', 'id2', 'id3'],
            },
        })
        let dispatch = sinon.spy()

        swipeCurrentFlashcard()(dispatch, getState)
        swipeCurrentFlashcard(false)(dispatch, getState)

        expect(dispatch.args[0][0]).to.eql({
            type: ACTION_SET_CURRENT_FLASHCARD,
            params: {
                id: 'id3',
            },
        })
        expect(dispatch.args[1][0]).to.eql({
            type: ACTION_SET_CURRENT_FLASHCARD,
            params: {
                id: 'id1',
            },
        })
    })
})
