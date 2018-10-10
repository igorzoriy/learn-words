import { Statuses } from "../types"
import {
    ActionTypes,
    updateUserData,
} from "./actions"
import reducer from "./reducer"

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

    it("should handle ACTION_UPDATE_USER_DATA", () => {
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

    it("should handle login action", () => {
        let state = reducer(undefined, {
            type: ActionTypes.Login,
            status: Statuses.Success,
            payload: {
                user: {
                    uid: "unique-id2",
                },
            },
        })
        expect(state.isAnonymous).toBe(false)
        expect(state.uid).toBe("unique-id2")
        expect(state.error).toBe("")

        state = reducer(undefined, {
            type: ActionTypes.Login,
            status: Statuses.Failure,
            payload: {
                message: "some error",
            },
        })
        expect(state.isAnonymous).toBe(true)
        expect(state.error).toBe("some error")
    })

    it("should handle logout action", () => {
        const state = reducer(undefined, {
            type: ActionTypes.Logout,
            status: Statuses.Success,
        })
        expect(state.uid).toBe("")
    })
})
