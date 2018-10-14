import { Dispatch } from "redux"
import { IAction } from "../types"
import { arrayShuffle, calculateNewPosition } from "../utils"

export enum ActionTypes {
    Init = "flashcards/init",
    SetCurrentCard = "flashcards/set-current-card",
    FlipCurrentCard = "flashcards/flip-current-card",
}

export interface IParams {
    id?: string
    ids?: string[]
}

export type Action = IAction<IParams>

export const initFlashcards = () => {
    return (dispatch: Dispatch, getState: () => any) => {
        const { ids } = getState().vocabulary.entities
        return dispatch({
            type: ActionTypes.Init,
            params: {
                ids: arrayShuffle(ids),
            },
        })
    }

}

export const setCurrentFlashcard = (id: string): Action => {
    return {
        type: ActionTypes.SetCurrentCard,
        params: {
            id,
        },
    }
}

export const flipCurrentFlashcard = (): Action => {
    return {
        type: ActionTypes.FlipCurrentCard,
    }
}

export const swipeCurrentFlashcard = (next: boolean) => {
    return (dispatch: Dispatch, getState: () => any) => {
        const state = getState()
        const { ids, currentId } = state.flashcards
        const index = ids.indexOf(currentId)
        return dispatch(setCurrentFlashcard(ids[calculateNewPosition(index, ids.length, next)]))
    }
}
