import {
    ActionTypes,
    login,
    logout,
    updateUserData,
} from "./actions"

describe("account actions", () => {
    it("should create an action to login", () => {
        expect(login()).toEqual({
            type: ActionTypes.Login,
        })
    })

    it("should create an action to logout", () => {
        expect(logout()).toEqual({
            type: ActionTypes.Logout,
        })
    })

    it("should create an action to update user data", () => {
        const user = {
            uid: "user-id",
        }

        expect(updateUserData(user)).toEqual({
            type: ActionTypes.UpdateUserData,
            payload: {
                user,
            },
        })
    })
})
