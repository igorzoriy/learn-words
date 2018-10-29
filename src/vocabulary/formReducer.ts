import { IFailureAction, initialStoreState, IVocabularyFormState as IState, Statuses } from "../types"
import { createReducer } from "../utils"
import { ActionTypes, IFillFormSuccessAction, IItemAction, IUpdateFormAction } from "./actions"

const initialState = initialStoreState.vocabulary.form

const reducerMap = {
    [ActionTypes.ClearForm]: (): IState => ({...initialState}),
    [ActionTypes.FillForm]: (state: IState): IState => ({
        ...state,
        status: Statuses.Request,
        phrase: "",
        translation: "",
        errorMessage: "",
        successMessage: "",
    }),
    [ActionTypes.FillFormFailure]: (state: IState, { params: { message } }: IFailureAction): IState => ({
        ...state,
        status: Statuses.Failure,
        errorMessage: message,
    }),
    [ActionTypes.FillFormSuccess]: (state: IState, {params: {phrase, translation}}: IFillFormSuccessAction): IState =>
    ({
        ...state,
        status: Statuses.Success,
        phrase,
        translation,
    }),
    [ActionTypes.UpdateForm]: (state: IState, {params: {phrase, translation}}: IUpdateFormAction): IState => ({
        ...state,
        phrase,
        translation,
    }),
    [ActionTypes.AddItem]: (state: IState, { params: { phrase, translation } }: IItemAction): IState => ({
        ...state,
        status: Statuses.Request,
        phrase,
        translation,
        errorMessage: "",
        successMessage: "",
    }),
    [ActionTypes.AddItemFailure]: (state: IState, { params: { message } }: IFailureAction): IState => ({
        ...state,
        status: Statuses.Failure,
        errorMessage: message,
    }),
    [ActionTypes.AddItemSuccess]: (state: IState): IState => ({
        ...state,
        status: Statuses.Success,
        phrase: "",
        translation: "",
        successMessage: "Item has beed saved successfully.",
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

export default createReducer(reducerMap, initialState)
