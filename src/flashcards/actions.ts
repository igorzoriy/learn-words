import { IAction } from "../types"

export enum ActionTypes {
    Init = "flashcards/init",
    SetData = "flashcards/set-data",
    NextCard = "flashcards/set-next",
    PrevCard = "flashcards/set-prev",
    FlipCurrentCard = "flashcards/flip-current-card",
}

export const initFlashcards = (): IAction => ({
    type: ActionTypes.Init,
})

export interface ISetDataAction extends IAction {
    params: {
        ids: string[],
    },
}

export const setFlashcardsData = (ids: string[]): ISetDataAction => ({
    type: ActionTypes.SetData,
    params: { ids },
})

export const nextFlashcard = (): IAction => ({
    type: ActionTypes.NextCard,
})

export const prevFlashcard = (): IAction => ({
    type: ActionTypes.PrevCard,
})

export const flipCurrentFlashcard = (): IAction => ({
    type: ActionTypes.FlipCurrentCard,
})
