/* eslint complexity: [2, 16] */
import firebase from 'firebase'
import {
    STATUS_REQUEST,
    STATUS_SUCCESS,
    STATUS_FAILURE,
} from './constants'
import {
    ACTION_LOGIN,
    ACTION_LOGOUT,
} from '../account/actions'
import {
    ACTION_ADD_VOCABULARY_ITEM,
    ACTION_EDIT_VOCABULARY_ITEM,
    ACTION_REMOVE_VOCABULARY_ITEM,
    ACTION_FILL_VOCABULARY_FORM,
    ACTION_FETCH_VOCABULARY_ITEMS,
} from '../vocabulary/actions'

export function createFirebaseMiddleware (config) {
    firebase.initializeApp(config)

    return ({ dispatch, getState }) => {
        return (next) => (action) => {
            const { type, status, params } = action

            let promise = null
            if (type === ACTION_LOGIN && !status) {
                const provider = new firebase.auth.FacebookAuthProvider()
                promise = firebase.auth().signInWithPopup(provider)
            } else if (type === ACTION_LOGOUT && !status) {
                promise = firebase.auth().signOut()
            } else if (type === ACTION_FETCH_VOCABULARY_ITEMS && !status) {
                const uid = getState().account.uid
                promise = firebase.database().ref(`/${uid}/vocabulary`).once('value')
            } else if (type === ACTION_ADD_VOCABULARY_ITEM && !status) {
                const uid = getState().account.uid
                promise = firebase.database().ref(`/${uid}/vocabulary`).push(params)
            } else if (type === ACTION_REMOVE_VOCABULARY_ITEM && !status) {
                const uid = getState().account.uid
                promise = firebase.database().ref(`/${uid}/vocabulary/${params.id}`).remove()
            } else if (type === ACTION_FILL_VOCABULARY_FORM && !status) {
                const uid = getState().account.uid
                promise = firebase.database().ref(`/${uid}/vocabulary/${params.id}`).once('value')
            } else if (type === ACTION_EDIT_VOCABULARY_ITEM && !status) {
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
                    if (data && data.val) {
                        data = data.val()
                    }
                    dispatch({
                        type,
                        status: STATUS_SUCCESS,
                        params,
                        data,
                    })
                },
                (data) => {
                    dispatch({
                        type,
                        status: STATUS_FAILURE,
                        params,
                        data,
                    })
                }
            )

            return promise
        }
    }
}
