import {
    ACTION_SET_CURRENT_FLASHCARD,
    ACTION_FLIP_CURRENT_FLASHCARD,
} from './actions'

const initialState = {
    currentId: null,
    showFront: true,
}

export default (state = initialState, action) => {
    const { type, params } = action
    const nextState = {}
    switch (type) {
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
