import { IAction } from "./types"

export function createReducer(
    reducerMap: {[id: string]: (state: {}, action: IAction) => any},
    initialState: {},
) {
    return (state = initialState, action: IAction) => {
        const reducer = reducerMap[action.type]

        if (reducer) {
            return reducer(state, action)
        }
        return state
    }
}

export function calculateNewPosition(index: number, length: number, next = true) {
    if (index < 0) {
        return next ? 0 : length - 1
    } else if (index === 0) {
        return next ? ++index : length - 1
    } else if (index === length - 1) {
        return next ? 0 : --index
    } else if (index >= length) {
        return next ? 0 : length - 1
    } else {
        return next ? ++index : --index
    }
}

export function arrayShuffle<T>(array: T[]): T[] {
    const result = array.slice()
    for (let i = 0, j, t; i < result.length; i++) {
        j = Math.floor(Math.random() * result.length)
        t = result[i]
        result[i] = result[j]
        result[j] = t
    }

    return result
}

export function getRandomItemsFromArray<T>(array: T[], count: number, exclude: T[] = []): T[] {
    let i = 1
    const result: T[] = []
    while (i <= count) {
        const item = array[Math.floor(Math.random() * array.length)]
        if (!result.includes(item) && !exclude.includes(item)) {
            result.push(item)
            i++
        }
    }
    return result
}
