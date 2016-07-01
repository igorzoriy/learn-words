import {
    ACTION_FETCH_VOCABULARY_ITEMS,
} from './actions'
import {
    STATUS_INIT,
} from '../api/constants'

const initialState = {
    status: STATUS_INIT,
}

export default (state = initialState, action) => {
    const { type, status } = action
    const nextState = {}
    switch (type) {
        case ACTION_FETCH_VOCABULARY_ITEMS:
            nextState.status = status
            return Object.assign({}, state, nextState)
        default:
            return state
    }
}
