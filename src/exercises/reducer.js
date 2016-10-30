import {
    ACTION_INIT_PHRASE_TRANSLATION_EXERCISE,
} from './actions'

const initialState = {
    items: [],
    currentIndex: 0,
}

export default (state = initialState, action) => {
    const { type, params } = action
    const nextState = {}

    switch (type) {
        case ACTION_INIT_PHRASE_TRANSLATION_EXERCISE:
            nextState.items = params.items
            nextState.currentId = (params.items[0] && params.items[0].id) || null
            nextState.currentIndex = 0
            break
    }

    return Object.assign({}, state, nextState)
}
