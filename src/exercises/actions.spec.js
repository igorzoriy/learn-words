/*eslint no-magic-numbers: 0 */
import expect from 'expect.js'
import sinon from 'sinon'
import {
    ACTION_INIT_PHRASE_TRANSLATION_EXERCISE,
    ACTION_ADD_ANSWER,
    ACTION_MOVE_TO_NEXT_QUESTION,
    initPhraseTranslationExecrise,
    addAnswer,
    moveToNextQuestion,
} from './actions'

let items = [
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

describe('exercises actions', () => {
    it('should create an action to init phrase translation exercise', () => {
        let getState = () => ({
            vocabulary: {
                entities: {
                    //TODO check small ids arrays
                    ids: [1, 2, 3, 4, 5, 6],
                },
            },
        })
        let dispatch = sinon.spy()
        initPhraseTranslationExecrise()(dispatch, getState)
        let action = dispatch.args[0][0]
        expect(action.type).to.be(ACTION_INIT_PHRASE_TRANSLATION_EXERCISE)
        // each question item should contain right answer in variants
        for (let item of action.params.items) {
            expect(item.variants).to.contain(item.id)
        }
    })

    it('should create an action to add an answer to current phrase', () => {
        expect(addAnswer('id', 'variantId')).to.eql({
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
            let dispatch = sinon.spy()
            moveToNextQuestion()(dispatch, getState)
            if (!dispatched) {
                expect(dispatch.called).not.to.be.ok()
                return
            }

            let action = dispatch.args[0][0]
            expect(dispatch.called).to.be.ok()
            expect(action.type).to.be(ACTION_MOVE_TO_NEXT_QUESTION)
            expect(action.params.index).to.be(expectedIndex)
        })
    })
})
