import { IAction, IUser } from "../types"

export enum ActionTypes {
    Login = "LOGIN",
    Logout = "LOGOUT",
    UpdateUserData = "UPDATE_USER_DATA",
}

export interface IPayload {
    user?: IUser
    message?: string
}

export const login = (): IAction<{}> => {
    return {
        type: ActionTypes.Login,
    }
}

export const logout = (): IAction<{}> => {
    return {
        type: ActionTypes.Logout,
    }
}

export const updateUserData = (user: IUser): IAction<IPayload> => {
    return {
        type: ActionTypes.UpdateUserData,
        payload: {
            user,
        },
    }
}
