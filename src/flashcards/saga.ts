import { put, select } from "redux-saga/effects"
import { IStoreState } from "../types"
import { arrayShuffle } from "../utils"
import { setFlashcardsData } from "./actions"

export function* initFlashcardsSaga() {
    try {
        const ids: string[] = yield select((state: IStoreState) => state.vocabulary.entities.ids)
        yield put(setFlashcardsData(arrayShuffle(ids)))
    } catch (err) {
        console.error(err)
    }
}
