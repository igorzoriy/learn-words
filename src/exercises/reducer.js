import {
    ACTION_INIT_PHRASE_TRANSLATION_EXERCISE,
    ACTION_ADD_ANSWER,
    ACTION_MOVE_TO_NEXT_QUESTION,
} from './actions'

function getItemIdByIndex (items, index) {
    // eslint-disable-next-line no-magic-numbers
    return items[index] && items[index].id ? items[index].id : -1
}

const initialState = {
    items: [],
    currentIndex: 0,
    currentId: null,
}

export default (state = initialState, action) => {
    const { type, params } = action
    const nextState = {}

    switch (type) {
        case ACTION_INIT_PHRASE_TRANSLATION_EXERCISE:
            nextState.items = params.items
            nextState.currentIndex = 0
            nextState.currentId = getItemIdByIndex(nextState.items, nextState.currentIndex)
            break

        case ACTION_ADD_ANSWER:
            nextState.items = state.items.map((item) => {
                if (item.id !== params.id) {
                    return Object.assign({}, item)
                } else {
                    return Object.assign({}, item, {
                        answer: params.variantId,
                    })
                }
            })
            break

        case ACTION_MOVE_TO_NEXT_QUESTION:
            nextState.currentIndex = params.index
            nextState.currentId = getItemIdByIndex(state.items, nextState.currentIndex)
            break
    }

    return Object.assign({}, state, nextState)
}
