/* eslint complexity: [2, 16] */
import firebase from 'firebase'
import {
    STATUS_REQUEST,
    STATUS_SUCCESS,
    STATUS_FAILURE,
} from './constants'
import { ActionTypes as AccountActionTypes } from '../account/actions'
import { ActionTypes as VocabularyActionTypes } from '../vocabulary/actions'

export function createFirebaseMiddleware (config) {
    firebase.initializeApp(config)

    return ({ dispatch, getState }) => {
        return (next) => (action) => {
            const { type, status, params } = action

            let promise = null
            if (type === AccountActionTypes.Login && !status) {
                const provider = new firebase.auth.FacebookAuthProvider()
                promise = firebase.auth().signInWithPopup(provider)
            } else if (type === AccountActionTypes.Logout && !status) {
                promise = firebase.auth().signOut()
            } else if (type === VocabularyActionTypes.Fetch && !status) {
                const uid = getState().account.uid
                promise = firebase.database().ref(`/${uid}/vocabulary`).once('value')
            } else if (type === VocabularyActionTypes.AddItem && !status) {
                const uid = getState().account.uid
                promise = firebase.database().ref(`/${uid}/vocabulary`).push(params)
            } else if (type === VocabularyActionTypes.RemoveItem && !status) {
                const uid = getState().account.uid
                promise = firebase.database().ref(`/${uid}/vocabulary/${params.id}`).remove()
            } else if (type === VocabularyActionTypes.FillForm && !status) {
                const uid = getState().account.uid
                promise = firebase.database().ref(`/${uid}/vocabulary/${params.id}`).once('value')
            } else if (type === VocabularyActionTypes.EditItem && !status) {
                const uid = getState().account.uid
                promise = firebase.database().ref(`/${uid}/vocabulary/${params.id}`).update({
                    phrase: params.phrase,
                    translation: params.translation,
                })
            }

            if (!promise) {
                return next(action)
            }

            action = {
                type,
                status: STATUS_REQUEST,
                params,
            }
            next(action)
            promise.then(
                (data) => {
                    let payload = {}
                    if ([AccountActionTypes.Login, AccountActionTypes.Logout].indexOf(type) >= 0) {
                        payload = data
                    } else if (type === VocabularyActionTypes.Fetch) {
                        payload = {
                            list: data.val(),
                        }
                    } else if (type === VocabularyActionTypes.AddItem) {
                        payload = {
                            id: data.key,
                        }
                    } else {
                        if (data && data.val) {
                            payload = data.val()
                        }
                    }

                    dispatch({
                        type,
                        status: STATUS_SUCCESS,
                        params,
                        data,
                        payload,
                    })
                },
                (data) => {
                    dispatch({
                        type,
                        status: STATUS_FAILURE,
                        params,
                        payload: data,
                        data,
                    })
                }
            )

            return promise
        }
    }
}
