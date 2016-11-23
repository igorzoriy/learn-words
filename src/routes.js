import firebase from 'firebase'
import { updateUserData } from './account/actions'
import App from './layout/App'
import NotFoundPage from './layout/NotFoundPage'
import LoginPage from './account/LoginPage'
import ListVocabularyItemsPage from './vocabulary/ListPage'
import AddVocabularyItemPage from './vocabulary/AddItemPage'
import EditVocabularyItemPage from './vocabulary/EditItemPage'
import FlashcardsPage from './flashcards/FlashcardsPage'
import PhraseTranslationExercisePage from './exercises/PhraseTranslationPage'

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
                path: '/vocabulary/add',
                component: AddVocabularyItemPage,
                onEnter: requireAuthCurried,
            },
            {
                path: '/vocabulary/edit/:id',
                component: EditVocabularyItemPage,
                onEnter: requireAuthCurried,
            },
            {
                path: '/flashcards',
                component: FlashcardsPage,
                onEnter: requireAuthCurried,
            },
            {
                path: '/exercises/phrase-translation',
                component: PhraseTranslationExercisePage,
                onEnter: requireAuthCurried,
            },
            {
                path: '*',
                component: NotFoundPage,
            },
        ],
    }
}
