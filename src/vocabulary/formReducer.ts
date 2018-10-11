import { Statuses } from "../types"
import { Action, ActionTypes } from "./actions"

interface IState {
    status: Statuses
    phrase: string
    translation: string
    errorMessage: string
    successMessage: string
}

const initialState: IState = {
    status: Statuses.Init,
    phrase: "",
    translation: "",
    errorMessage: "",
    successMessage: "",
}

export default (state: IState = initialState, action: Action): IState => {
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
