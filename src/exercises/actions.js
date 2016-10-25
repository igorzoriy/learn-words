import { arrayShuffle, getRandomItemsFromArray } from '../utils'

export const ACTION_INIT_PHRASE_TRANSLATION_EXERCISE = 'exercises/init-phrase-translation'

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
