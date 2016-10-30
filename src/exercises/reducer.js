import {
    ACTION_INIT_PHRASE_TRANSLATION_EXERCISE,
    ACTION_ADD_ANSWER,
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

        case ACTION_ADD_ANSWER:
            nextState.items = state.items.map((item) => {
                let answer
                if (item.id === params.id) {
                    answer = params.variantId
                }
                return Object.assign({}, item, {
                    answer,
                })
            })
            break
    }

    return Object.assign({}, state, nextState)
}
