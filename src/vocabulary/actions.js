import {
    ACTION_GET_VOCABULARY_LIST,
    ACTION_ADD_VOCABULARY_ITEM,
} from '../api/constants'

export function getVocabularyList () {
    return {
        type: ACTION_GET_VOCABULARY_LIST,
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
