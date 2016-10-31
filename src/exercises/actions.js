import { arrayShuffle, getRandomItemsFromArray } from '../utils'

export const ACTION_INIT_PHRASE_TRANSLATION_EXERCISE = 'exercises/init-phrase-translation'
export const ACTION_ADD_ANSWER = 'exercises/add-answer'
export const ACTION_MOVE_TO_NEXT_QUESTION = 'exercises/move-to-next-question'

export function initPhraseTranslationExecrise () {
    return (dispatch, getState) => {
        let { ids } = getState().vocabulary.entities
        let items = arrayShuffle(ids).map((id) => {
            /*eslint no-magic-numbers: 0 */
            let rightAnwer = [id]
            let variants = getRandomItemsFromArray(ids, 3, rightAnwer).concat(rightAnwer)
            variants = arrayShuffle(variants)
            return {
                id,
                variants,
                answer: null,
            }
        })

        return dispatch({
            type: ACTION_INIT_PHRASE_TRANSLATION_EXERCISE,
            params: {
                items,
            },
        })
    }
}

export function addAnswer (id, variantId) {
    return {
        type: ACTION_ADD_ANSWER,
        params: {
            id,
            variantId,
        },
    }
}

export function moveToNextQuestion () {
    return (dispatch, getState) => {
        let state = getState()
        let { items, currentIndex } = state.exercises
        let index = currentIndex + 1

        if (index === items.length) {
            return null
        }

        return dispatch({
            type: ACTION_MOVE_TO_NEXT_QUESTION,
            params: {
                index,
            },
        })
    }
}
