import * as actionTypes from './actionTypes'

export function addVocabularyItem (phrase, translation) {
    return {
        type: actionTypes.ADD_VOCABULARY_ITEM,
        phrase,
        translation,
    }
}

export function removeVocabularyItem (id) {
    return {
        type: actionTypes.REMOVE_VOCABULARY_ITEM,
        id,
    }
}
