import { getAuth } from '../firebase'
import { ACCOUNT_DATA_UPDATE } from './actions'

const authData = getAuth()

const initialState = {
    uid: authData ? authData.uid : null,
}

export default function accountReducer (state = initialState, action) {
    const { type } = action
    switch (type) {
        case ACCOUNT_DATA_UPDATE:
            return Object.assign({}, state, {
                uid: action.uid,
            })
        default:
            return state
    }
}
