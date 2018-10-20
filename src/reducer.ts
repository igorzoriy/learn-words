import { combineReducers } from "redux"
import accountReducer from "./account/reducer"
import exercises from "./exercises/reducer"
import flashcards from "./flashcards/reducer"
import { IStoreState } from "./types"
import vocabularyReducer from "./vocabulary/reducer"

export default combineReducers<IStoreState>({
    account: accountReducer,
    vocabulary: vocabularyReducer,
    flashcards,
    exercises,
})
