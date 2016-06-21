export const ACTION_ADD_VOCABULARY_ITEM = 'vocabulary/add-item'
export const ACTION_EDIT_VOCABULARY_ITEM = 'vocabulary/edit-item'
export const ACTION_REMOVE_VOCABULARY_ITEM = 'vocabulary/remove-item'
export const ACTION_FILL_VOCABULARY_FORM = 'vocabulary/fill-form'
export const ACTION_CLEAR_VOCABULARITY_FORM = 'vocabulary/clear-form'
export const ACTION_UPDATE_VOCABULARY_FORM = 'vocabulary/update-form'
export const ACTION_GET_VOCABULARY_ITEMS = 'vocabulary/get-items'

export function getVocabularyItems () {
    return {
        type: ACTION_GET_VOCABULARY_ITEMS,
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
