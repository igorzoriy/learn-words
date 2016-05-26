import firebase from 'firebase'
import {
    ACTION_UPDATE_USER_DATA,
    ACTION_LOGIN,
    ACTION_LOGOUT,
    STATUS_REQUEST,
    STATUS_SUCCESS,
    STATUS_FAILURE,
} from './constants'

export function createFirebaseMiddleware (config) {
    firebase.initializeApp(config)

    return ({ dispatch }) => {
        firebase.auth().onAuthStateChanged((user) => {
            dispatch({
                type: ACTION_UPDATE_USER_DATA,
                data: {
                    user,
                },
            })
        })

        return (next) => (action) => {
            const { type, status, params } = action

            let promise = null
            if (type === ACTION_LOGIN && !status) {
                const provider = new firebase.auth.FacebookAuthProvider()
                promise = firebase.auth().signInWithPopup(provider)
            } else if (type === ACTION_LOGOUT && !status) {
                promise = firebase.auth().signOut()
            }

            if (promise && promise.then) {
                action = {
                    type,
                    status: STATUS_REQUEST,
                    params,
                }
                next(action)

                return promise.then(
                    (data) => {
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
            }

            return next(action)
        }
    }
}
