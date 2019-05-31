import { IFailureAction, initialStoreState, IVocabularyFormState as IState, Statuses } from "../types"
import { createReducer } from "../utils"
import { ActionTypes, IItemAction, IUpdateFormAction } from "./actions"

const initialState = initialStoreState.vocabulary.add

const reducerMap = {
    [ActionTypes.UpdateAddForm]: (state: IState, { params: { phrase, translation } }: IUpdateFormAction): IState => ({
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
}

export const addReducer = createReducer(reducerMap, initialState)
