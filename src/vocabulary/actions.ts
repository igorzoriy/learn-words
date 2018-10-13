import { Dispatch } from "redux"
import { IAction, Statuses } from "../types"

export enum ActionTypes {
    Fetch = "vocabularity/fetch",
    AddItem = "vocabularity/add-item",
    EditItem = "vocabularity/edit-item",
    RemoveItem = "vocabularity/remove-item",
    FillForm = "vocabulary/fill-form",
    ClearForm = "vocabulary/clear-form",
    UpdateForm = "vocabulary/update-form",
}

export interface IItem {
    phrase: string
    translation: string
}

export interface IParams {
    id?: string
    phrase?: string
    translation?: string
}

export interface IPayload {
    id?: string
    phrase?: string
    translation?: string
    message?: string
    list?: {
        [id: string]: IItem,
    }
}

export type Action = IAction<IParams, IPayload>

export function fetchVocabularyItems() {
    return {
        type: ActionTypes.Fetch,
    }
}

export const getVocabularyItems = () => {
    return (dispatch: Dispatch, getState: () => any) => {
        const { status } = getState().vocabulary.entities
        if (status === Statuses.Success) {
            return Promise.resolve()
        }

        return dispatch(fetchVocabularyItems())
    }
}

export const addVocabularyItem = (phrase: string, translation: string): Action => {
    return {
        type: ActionTypes.AddItem,
        params: {
            phrase,
            translation,
        },
    }
}

export const editVocabularyItem = (id: string, phrase: string, translation: string): Action => {
    return {
        type: ActionTypes.EditItem,
        params: {
            id,
            phrase,
            translation,
        },
    }
}

export const removeVocabularyItem = (id: string): Action => {
    return {
        type: ActionTypes.RemoveItem,
        params: {
            id,
        },
    }
}

export const fillVocabularyForm = (id: string): Action => {
    return {
        type: ActionTypes.FillForm,
        params: {
            id,
        },
    }
}

export const clearVocabularyform = (): Action => {
    return {
        type: ActionTypes.ClearForm,
    }
}

export const updateVocabularyForm = (phrase: string, translation: string): Action => {
    return {
        type: ActionTypes.UpdateForm,
        params: {
            phrase,
            translation,
        },
    }
}
