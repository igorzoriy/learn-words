import {
    ACTION_INIT_PHRASE_TRANSLATION_EXERCISE,
    ACTION_ADD_ANSWER,
    ACTION_MOVE_TO_NEXT_QUESTION,
    ACTION_CALCULATE_RESULT,
    initPhraseTranslationExecrise,
    addAnswer,
    moveToNextQuestion,
    calculateResult,
} from './actions'

let items

describe('exercises actions', () => {
    beforeEach(() => {
        items = [
            {
                id: 2,
                items: [1, 2, 3, 4],
                answer: null,
            },
            {
                id: 1,
                items: [1, 2, 3, 4],
                answer: null,
            },
            {
                id: 4,
                items: [1, 2, 3, 4],
                answer: null,
            },
            {
                id: 3,
                items: [1, 2, 3, 4],
                answer: null,
            },
        ]
    })

    it('should create an action to init phrase translation exercise', () => {
        /*eslint no-magic-numbers: 0 */
        let getState = () => ({
            vocabulary: {
                entities: {
                    //TODO check small ids arrays
                    ids: [1, 2, 3, 4, 5, 6],
                },
            },
        })
        let dispatch = jest.fn()
        initPhraseTranslationExecrise()(dispatch, getState)
        let action = dispatch.mock.calls[0][0]
        expect(action.type).toBe(ACTION_INIT_PHRASE_TRANSLATION_EXERCISE)
        // each question item should contain right answer in variants
        for (let item of action.params.items) {
            expect(item.variants).toContain(item.id)
        }
    })

    it('should create an action to add an answer to current phrase', () => {
        expect(addAnswer('id', 'variantId')).toEqual({
            type: ACTION_ADD_ANSWER,
            params: {
                id: 'id',
                variantId: 'variantId',
            },
        })
    })

    it('should create an action to move to next question', () => {
        [
            {
                currentIndex: 0,
                expectedIndex: 1,
                dispatched: true,
            },
            {
                currentIndex: 1,
                expectedIndex: 2,
                dispatched: true,
            },
            {
                currentIndex: 2,
                expectedIndex: 3,
                dispatched: true,
            },
            {
                currentIndex: 3,
                expectedIndex: 3,
                dispatched: false,
            },
        ].forEach(({currentIndex, expectedIndex, dispatched}) => {
            let getState = () => ({
                exercises: {
                    currentIndex,
                    items,
                },
            })
            let dispatch = jest.fn()
            moveToNextQuestion()(dispatch, getState)
            if (!dispatched) {
                expect(dispatch).not.toHaveBeenCalled()
                return
            }

            let action = dispatch.mock.calls[0][0]
            expect(dispatch).toHaveBeenCalled()
            expect(action.type).toBe(ACTION_MOVE_TO_NEXT_QUESTION)
            expect(action.params.index).toBe(expectedIndex)
        })
    })

    it('should create an action to calculate exercise result', () => {
        expect(calculateResult()).toEqual({
            type: ACTION_CALCULATE_RESULT,
        })
    })
})
