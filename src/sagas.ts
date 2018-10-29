import { all, fork, takeLatest } from "redux-saga/effects"
import { ActionTypes as AccountActionTypes } from "./account/actions"
import { loginSaga, logoutSaga, watchUpdateUserDataSaga } from "./account/sagas"
import { ActionTypes as ExercisesActionTypes } from "./exercises/actions"
import { initPhraseTranslationExerciseSaga } from "./exercises/sagas"
import { ActionTypes as FlashcardsActionTypes } from "./flashcards/actions"
import { initFlashcardsSaga } from "./flashcards/sagas"
import { ActionTypes as VocabularyActionTypes } from "./vocabulary/actions"
import {
    addVocabularyItemSaga,
    editVocabularyItemSaga,
    fillVocabularyFormSaga,
    getVocabularitySaga,
    removeVocabularyItemSaga,
} from "./vocabulary/sagas"

export default function* rootSaga() {
    yield all([
        yield fork(watchUpdateUserDataSaga),
        yield takeLatest(AccountActionTypes.Login, loginSaga),
        yield takeLatest(AccountActionTypes.Logout, logoutSaga),
        yield takeLatest(VocabularyActionTypes.FillForm, fillVocabularyFormSaga),
        yield takeLatest(VocabularyActionTypes.Get, getVocabularitySaga),
        yield takeLatest(VocabularyActionTypes.AddItem, addVocabularyItemSaga),
        yield takeLatest(VocabularyActionTypes.EditItem, editVocabularyItemSaga),
        yield takeLatest(VocabularyActionTypes.RemoveItem, removeVocabularyItemSaga),
        yield takeLatest(ExercisesActionTypes.InitPhraseTranslationExercise, initPhraseTranslationExerciseSaga),
        yield takeLatest(FlashcardsActionTypes.Init, initFlashcardsSaga),
    ])
}
