import { call, put, select } from "redux-saga/effects"
import { IExerciseItem, IStoreState } from "../types"
import { arrayShuffle, getRandomItemsFromArray } from "../utils"
import { getVocabularitySaga } from "../vocabulary/sagas"
import { setPhraseTranslationExerciseData } from "./actions"

export function* initPhraseTranslationExerciseSaga() {
    try {
        yield call(getVocabularitySaga)
        const ids: string[] = yield select((state: IStoreState) => state.vocabulary.entities.ids)
        const items: IExerciseItem[] = arrayShuffle(ids).map((id): IExerciseItem => {
            const rightAnwer = [id]
            const variants = arrayShuffle(getRandomItemsFromArray(ids, 3, rightAnwer).concat(rightAnwer))
            return {
                id,
                variants,
                answer: null,
            }
        })
        yield put(setPhraseTranslationExerciseData(items))
    } catch (err) {
        console.error(err)
    }
}
