import firebase from "firebase/app"
import { eventChannel } from "redux-saga"
import { call, put, take } from "redux-saga/effects"
import { loginFailed, logoutSuccess, updateUserData } from "./actions"

export function* watchUpdateUserDataSaga() {
    const channel = eventChannel((emit) => {
        return firebase.auth().onAuthStateChanged((user) => {
            emit(updateUserData(user))
        })
    })
    while (true) {
        const action = yield take(channel)
        yield put(action)
    }
}

const callLogin = () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    return firebase.auth().signInWithPopup(provider).then(
        (result) => {
            const { user } = result
            return {
                user,
            }
        },
        (error) => {
            const { code, message } = error
            return {
                code,
                message,
            }
        },
    )
}

export function* loginSaga() {
    try {
        const payload = yield call(callLogin)
        const { code, message } = payload
        // successful authentication is handling by watchUpdateUserDataSaga
        if (code) {
            yield put(loginFailed(message))
        }
    } catch (err) {
        yield put(loginFailed("Unknown login error"))
    }
}

const callLogout = () => {
    return firebase.auth().signOut()
    .then(() => ({}))
    .catch((error) => ({ error }))
}

export function* logoutSaga() {
    try {
        const payload = yield call(callLogout)
        const { error } = payload
        if (!error) {
            yield put(logoutSuccess())
        }
    } catch (err) {
        console.error(err) // tslint:disable-line
    }
}
