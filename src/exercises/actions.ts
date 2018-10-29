import { IAction, IExerciseItem } from "../types"

export enum ActionTypes {
    InitPhraseTranslationExercise = "exercises/init-phrase-translation",
    SetPhraseTranslationExerciseData = "exercises/set-phrase-translation-data",
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

export const initPhraseTranslationExercise = (): IAction => {
    return {
        type: ActionTypes.InitPhraseTranslationExercise,
    }
}

export interface ISetExerciseDataAction extends IAction {
    params: {
        items: IExerciseItem[],
    },
}

export const setPhraseTranslationExerciseData = (items: IExerciseItem[]): ISetExerciseDataAction => {
    return {
        type: ActionTypes.SetPhraseTranslationExerciseData,
        params: {
            items,
        },
    }
}

export interface IAddAnswerAction extends IAction {
    params: {
        id: string,
        variantId: string,
    },
}

export const addAnswer = (id: string, variantId: string): IAddAnswerAction => {
    return {
        type: ActionTypes.AddAnswer,
        params: {
            id,
            variantId,
        },
    }
}

export const moveToNextQuestion = (): IAction => {
    return {
        type: ActionTypes.MoveToNextQuestion,
    }
}

export const calculateResult = (): IAction => {
    return {
        type: ActionTypes.CalculateResult,
    }
}
