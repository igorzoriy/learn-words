import merge from 'lodash/merge'
import { ACCOUNT_DATA_UPDATE } from './actions'

const initialState = {
    uid: null,
}

export default function accountReducer (state = initialState, action) {
    const { type } = action
    switch (type) {
        case ACCOUNT_DATA_UPDATE:
            return merge({}, state, {
                uid: action.uid,
            })
        default:
            return state
    }
}
