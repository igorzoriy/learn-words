import Firebase from 'firebase'
import {
    ACTION_GET_USER_DATA,
    ACTION_LOGIN,
    ACTION_LOGOUT,
    STATUS_REQUEST,
    STATUS_SUCCESS,
    STATUS_FAILURE,
} from './constants'

export function createFirebaseMiddleware ({ url }) {
    const ref = new Firebase(url)

    return ({ dispatch }) => (next) => (action) => {
        const { type, status, params } = action

        let promise = null
        if (type === ACTION_GET_USER_DATA) {
            const data = ref.getAuth()
            action = {
                type,
                data,
            }
        } else if (type === ACTION_LOGIN && !status) {
            promise = ref.authWithOAuthPopup('facebook')
        } else if (type === ACTION_LOGOUT && !status) {
            promise = ref.unauth()
        }

        if (promise instanceof Promise) {
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
