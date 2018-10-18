import { initialStoreState, IVocabularyFormState, Statuses } from "../types"
import { Action, ActionTypes } from "./actions"

const initialState = initialStoreState.vocabulary.form

export default (state: IVocabularyFormState = initialState, action: Action): IVocabularyFormState => {
    const { type, status, params, payload } = action

    switch (type) {
        case ActionTypes.ClearForm:
            return initialState

        case ActionTypes.FillForm:
            switch (status) {
                case Statuses.Request:
                    return {
                        ...state,
                        status,
                        phrase: "",
                        translation: "",
                        errorMessage: "",
                        successMessage: "",
                    }
                case Statuses.Failure:
                    return {
                        ...state,
                        status,
                        errorMessage: payload && payload.message ? payload.message : "Item hasn't been fetched.",
                    }
                case Statuses.Success:
                    return {
                        ...state,
                        status,
                        phrase: payload.phrase,
                        translation: payload.translation,
                    }
            }

        case ActionTypes.UpdateForm:
            return {
                ...state,
                phrase: params.phrase,
                translation: params.translation,
            }

        case ActionTypes.AddItem:
            switch (status) {
                case Statuses.Init:
                    return initialState
                case Statuses.Request:
                    return {
                        ...state,
                        status,
                        phrase: params.phrase,
                        translation: params.translation,
                        errorMessage: "",
                        successMessage: "",
                    }
                case Statuses.Failure:
                    return {
                        ...state,
                        status,
                        errorMessage: payload && payload.message ? payload.message : "Item hasn't been saved.",
                    }
                case Statuses.Success:
                    return {
                        ...state,
                        status,
                        phrase: "",
                        translation: "",
                        successMessage: payload && payload.message
                            ? payload.message
                            : "Item has beed saved successfully.",
                    }
            }

        case ActionTypes.EditItem:
            switch (status) {
                case Statuses.Request:
                    return {
                        ...state,
                        status,
                        phrase: params.phrase,
                        translation: params.translation,
                        errorMessage: "",
                        successMessage: "",
                    }
                case Statuses.Failure:
                    return {
                        ...state,
                        status,
                        errorMessage: payload && payload.message ? payload.message : "Item hasn't been saved.",
                    }
                case Statuses.Success:
                    return {
                        ...state,
                        status,
                        successMessage: payload && payload.message
                            ? payload.message
                            : "Item has beed updated successfully.",
                    }
            }
    }

    return state
}
