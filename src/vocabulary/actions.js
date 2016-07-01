import {
    calculateNewPosition,
} from './utils'

export const ACTION_ADD_VOCABULARY_ITEM = 'vocabulary/add-item'
export const ACTION_EDIT_VOCABULARY_ITEM = 'vocabulary/edit-item'
export const ACTION_REMOVE_VOCABULARY_ITEM = 'vocabulary/remove-item'
export const ACTION_FILL_VOCABULARY_FORM = 'vocabulary/fill-form'
export const ACTION_CLEAR_VOCABULARITY_FORM = 'vocabulary/clear-form'
export const ACTION_UPDATE_VOCABULARY_FORM = 'vocabulary/update-form'
export const ACTION_FETCH_VOCABULARY_ITEMS = 'vocabulary/fetch-items'
export const ACTION_SET_CURRENT_FLASHCARD = 'vocabulary/set-current-flashcard'
export const ACTION_FLIP_CURRENT_FLASHCARD = 'vocabulary/flip-current-flashcard'
export const ACTION_NEXT_CURRENT_FLASHCARD = 'vocabulary/next-current-flashcard'
export const ACTION_PREV_CURRENT_FLASHCARD = 'vocabulary/prev-current-flashcard'

export function fetchVocabularyItems () {
    return {
        type: ACTION_FETCH_VOCABULARY_ITEMS,
    }
}

export function getVocabularyItems () {
    return (dispatch, getState) => {
        const { ids } = getState().vocabulary.entities
        if (ids.length) {
            return Promise.resolve()
        }

        return dispatch(fetchVocabularyItems())
    }
}

export function addVocabularyItem (phrase, translation) {
    return {
        type: ACTION_ADD_VOCABULARY_ITEM,
        params: {
            phrase,
            translation,
        },
    }
}

export function editVocabularyItem (id, phrase, translation) {
    return {
        type: ACTION_EDIT_VOCABULARY_ITEM,
        params: {
            id,
            phrase,
            translation,
        },
    }
}

export function removeVocabularyItem (id) {
    return {
        type: ACTION_REMOVE_VOCABULARY_ITEM,
        params: {
            id,
        },
    }
}

export function fillVocabularyForm (id) {
    return {
        type: ACTION_FILL_VOCABULARY_FORM,
        params: {
            id,
        },
    }
}

export function clearVocabularyform () {
    return {
        type: ACTION_CLEAR_VOCABULARITY_FORM,
    }
}

export function updateVocabularyForm (phrase, translation) {
    return {
        type: ACTION_UPDATE_VOCABULARY_FORM,
        params: {
            phrase,
            translation,
        },
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

export function resetCurrentFlashcard () {
    return (dispatch, getState) => {
        const { ids } = getState().vocabulary.entities
        let id = null
        if (ids.length) {
            id = ids[0]
        }
        return dispatch(setCurrentFlashcard(id))
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
        let { ids } = state.vocabulary.entities
        let { currentId } = state.vocabulary.flashcards
        let index = ids.indexOf(currentId)
        return dispatch(setCurrentFlashcard(ids[calculateNewPosition(index, ids.length, next)]))
    }
}
