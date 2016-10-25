import expect from 'expect.js'
import sinon from 'sinon'
import {
    ACTION_INIT_PHRASE_TRANSLATION_EXERCISE,
    initPhraseTranslationExecrise,
} from './actions'

describe('exercises actions', () => {
    it('should create an action to init phrase translation exercise', () => {
        /*eslint no-magic-numbers: 0 */
        let getState = () => ({
            vocabulary: {
                entities: {
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
})
