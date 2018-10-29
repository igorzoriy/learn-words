import { IAccountState as IState, IFailureAction, initialStoreState } from "../types"
import { createReducer } from "../utils"
import { ActionTypes, IUpdateUserDataAction } from "./actions"

const initialState = initialStoreState.account

const reducerMap = {
    [ActionTypes.UpdateUserData]: (state: IState, { params: user }: IUpdateUserDataAction): IState => ({
        ...state,
        isLoading: false,
        isAnonymous: user ? false : true,
        uid: user ? user.uid : initialState.uid,
        error: "",
    }),
    [ActionTypes.LoginFailed]: (state: IState, { params: { message } }: IFailureAction): IState => ({
        ...state,
        error: message,
    }),
    [ActionTypes.LogoutSuccess]: (state: IState): IState => ({
        ...state,
        uid: "",
        isAnonymous: true,
        error: "",
    }),
}

export default createReducer(reducerMap, initialState)
