import {
    ActionTypes,
    updateUserData,
} from "./actions"
import { accountReducer as reducer } from "./reducer"

describe("account reducer", () => {
    it("should return initial state", () => {
        expect(reducer(undefined, {
            type: "init",
        })).toEqual({
            isLoading: true,
            isAnonymous: true,
            uid: "",
            error: "",
        })
    })

    it("should handle update user data action", () => {
        const user = {
            uid: "unique-id1",
        }

        const state = reducer(undefined, updateUserData(user))
        expect(state).toEqual({
            isLoading: false,
            isAnonymous: false,
            uid: "unique-id1",
            error: "",
        })
    })

    it("should handle login failed action", () => {
        const state = reducer(undefined, {
            type: ActionTypes.LoginFailed,
            params: {
                message: "some error",
            },
        })
        expect(state.isAnonymous).toBe(true)
        expect(state.error).toBe("some error")
    })

    it("should handle logout action", () => {
        const state = reducer(undefined, {
            type: ActionTypes.LogoutSuccess,
        })
        expect(state.uid).toBe("")
    })
})
