import { IAction, IFailureAction } from "../types"

export enum ActionTypes {
    Login = "account/login",
    LoginFailed = "account/login-failed",
    Logout = "account/logout",
    LogoutSuccess = "account/logout-success",
    UpdateUserData = "account/update-user-data",
}

export interface IUser {
    uid: string
}

export interface IPayload {
    user?: IUser
    message?: string
}

export const login = (): IAction => {
    return {
        type: ActionTypes.Login,
    }
}

export const loginFailed = (message: string): IFailureAction => {
    return {
        type: ActionTypes.LoginFailed,
        params: {
            message,
        },
    }
}

export const logout = (): IAction => {
    return {
        type: ActionTypes.Logout,
    }
}

export const logoutSuccess = (): IAction => {
    return {
        type: ActionTypes.LogoutSuccess,
    }
}

export interface IUpdateUserDataAction extends IAction {
    params: IUser,
}

export const updateUserData = (user: IUser): IUpdateUserDataAction => {
    return {
        type: ActionTypes.UpdateUserData,
        params: user,
    }
}
