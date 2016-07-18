import { arrayShuffle, calculateNewPosition } from '../utils'

export const ACTION_INIT_FLASHCARDS = 'flashcards/init'
export const ACTION_SET_CURRENT_FLASHCARD = 'flashcards/set-current'
export const ACTION_FLIP_CURRENT_FLASHCARD = 'flashcards/flip-current'

export function initFlashcards () {
    return (dispatch, getState) => {
        const { ids } = getState().vocabulary.entities
        return dispatch({
            type: ACTION_INIT_FLASHCARDS,
            params: {
                ids: arrayShuffle(ids),
            },
        })
    }
}

export function setCurrentFlashcard (id) {
    return {
        type: ACTION_SET_CURRENT_FLASHCARD,
        params: {
            id,
        },
    }
}

export function flipCurrentFlashcard () {
    return {
        type: ACTION_FLIP_CURRENT_FLASHCARD,
    }
}

export function swipeCurrentFlashcard (next) {
    return (dispatch, getState) => {
        let state = getState()
        let { ids, currentId } = state.flashcards
        let index = ids.indexOf(currentId)
        return dispatch(setCurrentFlashcard(ids[calculateNewPosition(index, ids.length, next)]))
    }
}
