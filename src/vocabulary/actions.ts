import { IAction, ICard, ICardList, IFailureAction } from "../types"

export enum ActionTypes {
    ClearForm = "vocabulary/clear-form",

    Get = "vocabularity/get",
    Fetch = "vocabularity/fetch",
    FetchSuccess = "vocabularity/fetch-success",
    FetchFailure = "vocabularity/fetch-failure",

    UpdateAddForm = "vocabulary/update-add-form",
    AddItem = "vocabularity/add-item",
    AddItemSuccess = "vocabularity/add-item-success",
    AddItemFailure = "vocabularity/add-item-failure",

    FillEditForm = "vocabulary/fill-edit-form",
    FillEditFormSuccess = "vocabulary/fill-edit-form-success",
    FillEditFormFailure = "vocabulary/fill-edit-form-failure",
    UpdateEditForm = "vocabulary/update-edit-form",
    EditItem = "vocabularity/edit-item",
    EditItemSuccess = "vocabularity/edit-item-success",
    EditItemFailure = "vocabularity/edit-item-failure",

    RemoveItem = "vocabularity/remove-item",
    RemoveItemSuccess = "vocabularity/remove-item-success",
}

export const clearVocabularyForm = (): IAction => {
    return {
        type: ActionTypes.ClearForm,
    }
}

export interface IFillFormAction extends IAction {
    params: {
        id: string,
    },
}

export const fillVocabularyForm = (id: string): IFillFormAction => {
    return {
        type: ActionTypes.FillEditForm,
        params: {
            id,
        },
    }
}

export interface IFillFormSuccessAction extends IAction {
    params: ICard,
}

export const fillVocabularyFormSuccess = (item: ICard): IFillFormSuccessAction => {
    return {
        type: ActionTypes.FillEditFormSuccess,
        params: item,
    }
}

export const fillVocabularyFormFailure = (message: string): IFailureAction => {
    return {
        type: ActionTypes.FillEditFormFailure,
        params: {
            message,
        },
    }
}

export interface IUpdateFormAction extends IAction {
    params: {
        phrase: string,
        translation: string,
    },
}

export const updateVocabularyAddForm = (phrase: string, translation: string): IUpdateFormAction => ({
    type: ActionTypes.UpdateAddForm,
    params: {
        phrase,
        translation,
    },
})

export const updateVocabularyEditForm = (phrase: string, translation: string): IUpdateFormAction => ({
    type: ActionTypes.UpdateEditForm,
    params: {
        phrase,
        translation,
    },
})

export const fetchVocabularyItems = (): IAction => {
    return {
        type: ActionTypes.Fetch,
    }
}

export interface IFetchSuccessAction extends IAction {
    params: {
        list: ICardList,
    },
}

export const fetchVocabularyItemsSuccess = (list: ICardList): IFetchSuccessAction => {
    return {
        type: ActionTypes.FetchSuccess,
        params: {
            list,
        },
    }
}

export const fetchVocabularyItemsFailure = (message: string): IFailureAction => {
    return {
        type: ActionTypes.FetchFailure,
        params: {
            message,
        },
    }
}

export const getVocabularyItems = (): IAction => {
    return {
        type: ActionTypes.Get,
    }
}

export interface IItemAction extends IAction {
    params: ICard,
}

export const addVocabularyItem = (phrase: string, translation: string): IItemAction => {
    return {
        type: ActionTypes.AddItem,
        params: {
            id: "",
            phrase,
            translation,
        },
    }
}

export const addVocabularyItemSuccess = (item: ICard): IItemAction => {
    return {
        type: ActionTypes.AddItemSuccess,
        params: item,
    }
}

export const addVocabularyItemsFailure = (message: string): IFailureAction => {
    return {
        type: ActionTypes.AddItemFailure,
        params: {
            message,
        },
    }
}

export const editVocabularyItem = (item: ICard): IItemAction => {
    return {
        type: ActionTypes.EditItem,
        params: item,
    }
}

export const editVocabularyItemSuccess = (item: ICard): IItemAction => {
    return {
        type: ActionTypes.EditItemSuccess,
        params: item,
    }
}

export const editVocabularyItemFailure = (message: string): IFailureAction => {
    return {
        type: ActionTypes.EditItemFailure,
        params: {
            message,
        },
    }
}

export interface IRemoveItemAction extends IAction {
    params: {
        id: string,
    },
}

export const removeVocabularyItem = (id: string): IRemoveItemAction => {
    return {
        type: ActionTypes.RemoveItem,
        params: {
            id,
        },
    }
}

export const removeVocabularyItemSuccess = (id: string): IRemoveItemAction => ({
    type: ActionTypes.RemoveItemSuccess,
    params: {
        id,
    },
})
