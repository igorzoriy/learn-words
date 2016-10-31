/*eslint no-magic-numbers: 0 */
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
        let dispatch = jest.fn()
        initFlashcards()(dispatch, getState)
        expect(dispatch.mock.calls[0][0]).toEqual({
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
        dispatch = jest.fn()
        initFlashcards()(dispatch, getState)
        let result = dispatch.mock.calls[0][0]
        expect(result.type).toBe(ACTION_INIT_FLASHCARDS)
        expect(result.params.ids.sort()).toEqual(['id1', 'id2'])
    })

    it('should create an action to set current flashcard', () => {
        expect(setCurrentFlashcard('id')).toEqual({
            type: ACTION_SET_CURRENT_FLASHCARD,
            params: {
                id: 'id',
            },
        })
    })

    it('should create an action to flip current flashcard', () => {
        expect(flipCurrentFlashcard()).toEqual({
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
        let dispatch = jest.fn()

        swipeCurrentFlashcard()(dispatch, getState)
        swipeCurrentFlashcard(false)(dispatch, getState)

        expect(dispatch.mock.calls[0][0]).toEqual({
            type: ACTION_SET_CURRENT_FLASHCARD,
            params: {
                id: 'id3',
            },
        })
        expect(dispatch.mock.calls[1][0]).toEqual({
            type: ACTION_SET_CURRENT_FLASHCARD,
            params: {
                id: 'id1',
            },
        })
    })
})
