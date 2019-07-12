import { combineReducers } from "redux"
import { accountReducer } from "./account/reducer"
import { exercisesReducer } from "./exercises/reducer"
import { flashcardsReducer } from "./flashcards/reducer"
import { IStoreState } from "./types"
import { vocabularyReducer } from "./vocabulary/reducer"

export const reducer = combineReducers<IStoreState>({
    account: accountReducer,
    vocabulary: vocabularyReducer,
    flashcards: flashcardsReducer,
    exercises: exercisesReducer,
})
