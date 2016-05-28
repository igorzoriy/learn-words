import {
    ACTION_GET_VOCABULARY_LIST,
} from '../api/constants'

export function getVocabularyList () {
    return {
        type: ACTION_GET_VOCABULARY_LIST,
    }
}
