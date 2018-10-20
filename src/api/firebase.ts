import * as firebase from "firebase"
import { Dispatch } from "redux"
import { ActionTypes as AccountActionTypes } from "../account/actions"
import { IAction, IStoreState, Statuses } from "../types"
import { ActionTypes as VocabularyActionTypes, IParams } from "../vocabulary/actions"

export function createFirebaseMiddleware(config: object) {
    firebase.initializeApp(config)

    return ({ dispatch, getState }: { dispatch: Dispatch, getState: () => IStoreState}) => {
        return (next: Dispatch) => (action: IAction<IParams>) => {
            const { type, status, params } = action

            const dispatchRequest = () => {
                next({
                    ...action,
                    status: Statuses.Request,
                })
            }
            const dispatchSuccess = (payload: object | void) => {
                dispatch({
                    type,
                    status: Statuses.Success,
                    params,
                    payload,
                })
            }
            const dispatchFailure = (error: object) => {
                dispatch({
                    type,
                    status: Statuses.Failure,
                    params,
                    payload: error,
                })
            }

            switch (type) {
                case AccountActionTypes.Login:
                    if (!status) {
                        const provider = new firebase.auth.FacebookAuthProvider()
                        firebase.auth().signInWithPopup(provider).then(
                            dispatchSuccess,
                            dispatchFailure,
                        )
                        return dispatchRequest()
                    }
                    break

                case AccountActionTypes.Logout:
                    if (!status) {
                        firebase.auth().signOut().then(
                            dispatchSuccess,
                            dispatchFailure,
                        )
                        return dispatchRequest()
                    }
                    break

                case VocabularyActionTypes.Fetch:
                    if (!status) {
                        const { uid } = getState().account
                        firebase.database().ref(`/${uid}/vocabulary`).once("value").then(
                            (data) => {
                                dispatchSuccess({
                                    list: data.val(),
                                })
                            },
                            dispatchFailure,
                        )
                        return dispatchRequest()
                    }
                    break

                case VocabularyActionTypes.AddItem:
                    if (!status) {
                        const { uid } = getState().account
                        firebase.database().ref(`/${uid}/vocabulary`).push(params).then(
                            (data) => {
                                dispatchSuccess({
                                    id: data.key,
                                })
                            },
                            dispatchFailure,
                        )
                        return dispatchRequest()
                    }
                    break

                case VocabularyActionTypes.RemoveItem:
                    if (!status) {
                        const uid = getState().account.uid
                        firebase.database().ref(`/${uid}/vocabulary/${params.id}`).remove().then(
                            dispatchSuccess,
                            dispatchFailure,
                        )
                        return dispatchRequest()
                    }
                    break

                case VocabularyActionTypes.EditItem:
                    if (!status) {
                        const { uid } = getState().account
                        firebase.database().ref(`/${uid}/vocabulary/${params.id}`).update({
                            phrase: params.phrase,
                            translation: params.translation,
                        }).then(
                            dispatchSuccess,
                            dispatchFailure,
                        )
                        return dispatchRequest()
                    }
                    break

                case VocabularyActionTypes.FillForm:
                    if (!status) {
                        const { uid } = getState().account
                        firebase.database().ref(`/${uid}/vocabulary/${params.id}`).once("value").then(
                            (data) => dispatchSuccess(data.val()),
                            dispatchFailure,
                        )
                        return dispatchRequest()
                    }
            }

            next(action)
        }
    }
}
