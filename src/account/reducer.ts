import { IAccountState, IAction, initialStoreState, Statuses } from "../types"
import { ActionTypes, IPayload } from "./actions"

const initialState = initialStoreState.account

export default function accountReducer(
    state: IAccountState = initialState,
    action: IAction<{}, IPayload>,
    ): IAccountState {
    const { type, status, payload } = action

    if (type === ActionTypes.UpdateUserData) {
        return {
            ...state,
            isLoading: false,
            isAnonymous: payload.user ? false : true,
            uid: payload.user ? payload.user.uid : initialState.uid,
        }
    } else if (type === ActionTypes.Login && status === Statuses.Success) {
        return {
            ...state,
            isAnonymous: false,
            uid: payload.user.uid,
            error: initialState.error,
        }
    } else if (type === ActionTypes.Login && status === Statuses.Failure) {
        return {
            ...state,
            error: payload.message,
        }
    } else if (type === ActionTypes.Logout && status === Statuses.Success) {
        return {
            ...state,
            uid: initialState.uid,
            isAnonymous: true,
            error: initialState.error,
        }
    }

    return state
}
