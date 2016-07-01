import {
    ACTION_FETCH_VOCABULARY_ITEMS,
    ACTION_SET_CURRENT_FLASHCARD,
    ACTION_FLIP_CURRENT_FLASHCARD,
} from './actions'
import {
    STATUS_INIT,
} from '../api/constants'

const initialState = {
    status: STATUS_INIT,
    currentId: null,
    showFront: true,
}

export default (state = initialState, action) => {
    const { type, status, params } = action
    const nextState = {}
    switch (type) {
        case ACTION_FETCH_VOCABULARY_ITEMS:
            nextState.status = status
            break
        case ACTION_SET_CURRENT_FLASHCARD:
            nextState.currentId = params.id
            break
        case ACTION_FLIP_CURRENT_FLASHCARD:
            nextState.showFront = !state.showFront
            break
        default:
            return state
    }
    return Object.assign({}, state, nextState)
}
