import * as firebase from "firebase"
import { call, put, select } from "redux-saga/effects"
import { ICard, IStoreState, Statuses } from "../types"
import {
    addVocabularyItemsFailure,
    addVocabularyItemSuccess,
    editVocabularyItemFailure,
    editVocabularyItemSuccess,
    fetchVocabularyItems,
    fetchVocabularyItemsFailure,
    fetchVocabularyItemsSuccess,
    fillVocabularyFormFailure,
    fillVocabularyFormSuccess,
    IFillFormAction,
    IItemAction,
    IRemoveItemAction,
    removeVocabularyItemSuccess,
} from "./actions"

function callFillForm(uid: string, id: string) {
    return firebase.database().ref(`/${uid}/vocabulary/${id}`).once("value")
    .then(
        (data) => ({ item: data.val() }),
        (error) => ({ message: error.message ? error.message : "Item hasn't been fetched." }),
    )
}

export function* fillVocabularyFormSaga(action: IFillFormAction) {
    const { params: { id } } = action
    try {
        const { uid } = yield select((state: IStoreState) => state.account)
        const { message, item } = yield call(callFillForm, uid, id)
        if (!message) {
            yield put(fillVocabularyFormSuccess({
                ...item,
                id,
            }))
        } else {
            yield put(fillVocabularyFormFailure(message))
        }
    } catch (err) {
        console.error(err)
    }
}

function callFetchVocabularity(uid: string) {
    return firebase.database().ref(`/${uid}/vocabulary`).once("value").then(
        (data) => ({ list: data.val() || [], message: null }),
        (error) => ({ list: [], message: error.message }),
    )
}

export function* getVocabularitySaga() {
    try {
        const { status } = yield select((state: IStoreState) => state.vocabulary.entities)
        if (status === Statuses.Success) {
            return
        }
        yield put(fetchVocabularyItems())
        const { uid } = yield select((state: IStoreState) => state.account)
        const { list, message } = yield call(callFetchVocabularity, uid)
        if (message === null) {
            yield put(fetchVocabularyItemsSuccess(list))
        } else {
            yield put(fetchVocabularyItemsFailure(message))
        }
    } catch (err) {
        console.error(err)
    }
}

function callAddVocabularityItem(uid: string, item: ICard) {
    return firebase.database().ref(`/${uid}/vocabulary`).push(item).then(
        (data) => ({ id: data.key }),
        (error) => ({ message: error.message ? error.message : "Item hasn't been added." }),
    )

}

export function* addVocabularyItemSaga(action: IItemAction) {
    const {params: item } = action
    try {
        const { uid } = yield select((state: IStoreState) => state.account)
        const { id, message } = yield call(callAddVocabularityItem, uid, item)
        if (id) {
            yield put(addVocabularyItemSuccess(id))
        } else {
            yield put(addVocabularyItemsFailure(message))
        }
    } catch (err) {
        console.error(err)
    }
}

function callEditVocabularityItem(uid: string, { id, phrase, translation }: ICard) {
    return firebase.database().ref(`/${uid}/vocabulary/${id}`).update({
        phrase,
        translation,
    }).then(
        () => ({}),
        (error) => ({ message: error.message ? error.message : "Item hasn't been edited." }),
    )
}

export function* editVocabularyItemSaga(action: IItemAction) {
    const { params: item } = action
    try {
        const { uid } = yield select((state: IStoreState) => state.account)
        const { message } = yield call(callEditVocabularityItem, uid, item)
        if (!message) {
            yield put(editVocabularyItemSuccess(item))
        } else {
            yield put(editVocabularyItemFailure(message))
        }
    } catch (err) {
        console.error(err)
    }
}

function callRemoveVocabularyItem(uid: string, id: string) {
    return firebase.database().ref(`/${uid}/vocabulary/${id}`).remove()
    .then(
        () => ({}),
        (error) => ({ message: error.message }),
    )
}

export function* removeVocabularyItemSaga(action: IRemoveItemAction) {
    const { params: { id } } = action
    try {
        const { uid } = yield select((state: IStoreState) => state.account)
        const { message } = yield call(callRemoveVocabularyItem, uid, id)
        if (!message) {
            yield put(removeVocabularyItemSuccess(id))
        }
    } catch (err) {
        console.error(err)
    }
}
