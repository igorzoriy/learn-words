import {createStore, combineReducers } from 'redux'
import { vocabularyReducer } from './vocabulary/reducer'
import { addVocabularyItem, removeVocabularyItem } from './vocabulary/actions'

const rootReducer = combineReducers({
    vocabulary: vocabularyReducer,
})
const store = createStore(rootReducer)
store.dispatch(addVocabularyItem('phrase1', 'translation1'))
store.dispatch(addVocabularyItem('phrase2', 'translation2'))
store.dispatch(addVocabularyItem('phrase3', 'translation3'))
store.dispatch(removeVocabularyItem(1))
console.log(store.getState())
