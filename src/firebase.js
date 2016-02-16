import Firebase from 'firebase'

const ref = new Firebase('fiery-fire-8640.firebaseio.com')

export function getAuth () {
    return ref.getAuth()
}

export function auth (callback) {
    ref.authWithOAuthPopup('facebook', callback)
}
