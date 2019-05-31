import { IFailureAction, initialStoreState, IVocabularyFormState as IState, Statuses } from "../types"
import { createReducer } from "../utils"
import { ActionTypes, IFillFormSuccessAction, IItemAction, IUpdateFormAction } from "./actions"

const initialState = initialStoreState.vocabulary.edit

const reducerMap = {
    [ActionTypes.ClearForm]: (): IState => ({ ...initialState }),
    [ActionTypes.FillEditForm]: (state: IState): IState => ({
        ...state,
        status: Statuses.Request,
        phrase: "",
        translation: "",
        errorMessage: "",
        successMessage: "",
    }),
    [ActionTypes.FillEditFormFailure]: (state: IState, { params: { message } }: IFailureAction): IState => ({
        ...state,
        status: Statuses.Failure,
        errorMessage: message,
    }),
    [ActionTypes.FillEditFormSuccess]: (state: IState, { params: { phrase, translation } }: IFillFormSuccessAction):
        IState => ({
            ...state,
            status: Statuses.Success,
            phrase,
            translation,
        }),
    [ActionTypes.UpdateEditForm]: (state: IState, { params: { phrase, translation } }: IUpdateFormAction): IState => ({
        ...state,
        phrase,
        translation,
    }),

    [ActionTypes.EditItem]: (state: IState, { params: { phrase, translation } }: IItemAction): IState => ({
        ...state,
        status: Statuses.Request,
        phrase,
        translation,
        errorMessage: "",
        successMessage: "",
    }),
    [ActionTypes.EditItemFailure]: (state: IState, { params: { message } }: IFailureAction): IState => ({
        ...state,
        status: Statuses.Failure,
        errorMessage: message,
    }),
    [ActionTypes.EditItemSuccess]: (state: IState, action: IItemAction): IState => ({
        ...state,
        status: Statuses.Success,
        successMessage: "Item has beed updated successfully.",
    }),
}

export const editReducer = createReducer(reducerMap, initialState)
