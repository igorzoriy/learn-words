import {
    ActionTypes,
    login,
    loginFailed,
    logout,
    logoutSuccess,
    updateUserData,
} from "./actions"

describe("account actions", () => {
    it("should create an action to login", () => {
        expect(login()).toEqual({
            type: ActionTypes.Login,
        })
    })

    it("should create an action to failed login", () => {
        expect(loginFailed("error message")).toEqual({
            type: ActionTypes.LoginFailed,
            params: {
                message: "error message",
            },
        })
    })

    it("should create an action to logout", () => {
        expect(logout()).toEqual({
            type: ActionTypes.Logout,
        })
    })

    it("should create an action to successful logout", () => {
        expect(logoutSuccess()).toEqual({
            type: ActionTypes.LogoutSuccess,
        })
    })

    it("should create an action to update user data", () => {
        const user = {
            uid: "user-id",
        }

        expect(updateUserData(user)).toEqual({
            type: ActionTypes.UpdateUserData,
            params: user,
        })
    })
})
