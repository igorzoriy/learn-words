import { Dispatch } from "redux"
import { IAction, IStoreState } from "../types"

export enum ActionTypes {
    InitPhraseTranslationExecrise = "exercises/init-phrase-translation",
    AddAnswer = "exercises/add-answer",
    MoveToNextQuestion = "exercises/move-to-next-question",
    CalculateResult = "exercises/calculate-result",
}

export interface IParams {
    ids?: string[],
    id?: string,
    variantId?: string,
    index?: number,
}

export type Action = IAction<IParams>

export function initPhraseTranslationExecrise() {
    return (dispatch: Dispatch, getState: () => IStoreState): Action => {
        return dispatch({
            type: ActionTypes.InitPhraseTranslationExecrise,
            params: {
                ids: getState().vocabulary.entities.ids,
            },
        })
    }
}

export function addAnswer(id: string, variantId: string): Action {
    return {
        type: ActionTypes.AddAnswer,
        params: {
            id,
            variantId,
        },
    }
}

export function moveToNextQuestion() {
    return (dispatch: Dispatch, getState: () => IStoreState): Action => {
        const { items, currentIndex } = getState().exercises
        const index = currentIndex + 1

        if (index === items.length) {
            return null
        }

        return dispatch({
            type: ActionTypes.MoveToNextQuestion,
            params: {
                index,
            },
        })
    }
}

export function calculateResult() {
    return {
        type: ActionTypes.CalculateResult,
    }
}
