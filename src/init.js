import {createStore } from 'redux'

const ADD_VOCABULARY_ITEM = 'add-vocabulary-item'
const REMOVE_VOCABULARY_ITEM = 'remove-vocabulary-item'

function addVocabularyItem (phrase, translation) {
    return {
        type: ADD_VOCABULARY_ITEM,
        phrase,
        translation,
    }
}

function removeVocabularyItem (id) {
    return {
        type: REMOVE_VOCABULARY_ITEM,
        id,
    }
}

const initialState = {
    vocabulary: [],
}


function translationReducer (state = initialState, action) {
    switch (action.type) {
        case ADD_VOCABULARY_ITEM:
            const newState = {
                vocabulary: [
                    ...state.vocabulary,
                    {
                        phrase: action.phrase,
                        translation: action.translation,
                    },
                ],
            }
            return Object.assign({}, state, newState)
        case REMOVE_VOCABULARY_ITEM:
        default:
            return state
    }
}

const store = createStore(translationReducer)
store.dispatch(addVocabularyItem('phrase1', 'translation1'))
store.dispatch(addVocabularyItem('phrase2', 'translation2'))
store.dispatch(addVocabularyItem('phrase3', 'translation3'))
console.log(store.getState())
