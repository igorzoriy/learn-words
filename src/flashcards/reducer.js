import {
    ACTION_INIT_FLASHCARDS,
    ACTION_SET_CURRENT_FLASHCARD,
    ACTION_FLIP_CURRENT_FLASHCARD,
} from './actions'

const initialState = {
    currentId: null,
    ids: [],
    showFront: true,
}

export default (state = initialState, action) => {
    const { type, params } = action
    const nextState = {}
    switch (type) {
        case ACTION_INIT_FLASHCARDS:
            nextState.ids = params.ids
            nextState.currentId = params.ids[0] || null
            nextState.showFront = true
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
