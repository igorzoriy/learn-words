export const ACCOUNT_DATA_UPDATE = 'account/data-update'

export function updateUserData (authData) {
    return {
        type: ACCOUNT_DATA_UPDATE,
        uid: authData.uid,
    }
}
