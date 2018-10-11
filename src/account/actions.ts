import { IAction, IUser } from "../types"

export enum ActionTypes {
    Login = "account/login",
    Logout = "account/logout",
    UpdateUserData = "account/update-user-data",
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

export const logout = (): IAction => {
    return {
        type: ActionTypes.Logout,
    }
}

export const updateUserData = (user: IUser): IAction<{}, IPayload> => {
    return {
        type: ActionTypes.UpdateUserData,
        payload: {
            user,
        },
    }
}
