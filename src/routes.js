import firebase from 'firebase'
import { updateUserData } from './account/actions'
import App from './layout/App'
import LoginPage from './account/LoginPage'
import ListVocabularyItemsPage from './vocabulary/ListPage'
import NewVocabularyItemPage from './vocabulary/NewItemPage'

function requireAuth (dispatch, nextState, replace, callback) {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
        unsubscribe()
        if (!user) {
            replace('/login')
        }
        dispatch(updateUserData(user))
        callback()
    })
}

function requireAnon (dispatch, nextState, replace, callback) {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
        unsubscribe()
        if (user) {
            replace('/')
        }
        dispatch(updateUserData(user))
        callback()
    })
}

export default function getRoutes (dispatch) {
    const requireAuthCurried = requireAuth.bind(null, dispatch)
    const requireAnonCurried = requireAnon.bind(null, dispatch)

    return {
        path: '/',
        component: App,
        indexRoute: {
            onEnter: (nextState, replace) => replace('/vocabulary/list'),
        },

        childRoutes: [
            {
                path: '/login',
                component: LoginPage,
                onEnter: requireAnonCurried,
            },
            {
                path: '/vocabulary/list',
                component: ListVocabularyItemsPage,
                onEnter: requireAuthCurried,
            },
            {
                path: '/vocabulary/new',
                component: NewVocabularyItemPage,
                onEnter: requireAuthCurried,
            },
        ],
    }
}
