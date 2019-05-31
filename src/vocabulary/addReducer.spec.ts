import { Statuses } from "../types"
import { ActionTypes } from "./actions"
import { addReducer as reducer } from "./addReducer"

const testInitialState = {
    status: Statuses.Init,
    phrase: "phrase",
    translation: "translation",
    errorMessage: "",
    successMessage: "",
}

describe("vocabulary form reducer", () => {
    it("should return initial state", () => {
        expect(reducer(undefined, {
            type: "init",
        })).toEqual({
            status: Statuses.Init,
            phrase: "",
            translation: "",
            errorMessage: "",
            successMessage: "",
        })
    })

    it("should handle update form action", () => {
        const state = reducer(testInitialState, {
            type: ActionTypes.UpdateAddForm,
            params: {
                phrase: "updated-phrase",
                translation: "updated-translation",
            },
        })
        expect(state.phrase).toBe("updated-phrase")
        expect(state.translation).toBe("updated-translation")
    })

    it("should handle add item action", () => {
        const state = reducer(testInitialState, {
            type: ActionTypes.AddItem,
            params: {
                phrase: "newphrase",
                translation: "newtranslation",
            },
        })
        expect(state.status).toBe(Statuses.Request)
        expect(state.phrase).toBe("newphrase")
        expect(state.translation).toBe("newtranslation")
        expect(state.errorMessage).toBe("")
        expect(state.successMessage).toBe("")
    })

    it("should handle add item failure action", () => {
        const state = reducer(testInitialState, {
            type: ActionTypes.AddItemFailure,
            params: {
                message: "error message",
            },
        })
        expect(state.status).toBe(Statuses.Failure)
        expect(state.phrase).toBe("phrase")
        expect(state.translation).toBe("translation")
        expect(state.errorMessage).toBe("error message")
        expect(state.successMessage).toBe("")
    })

    it("should handle add item success action", () => {
        const state = reducer(testInitialState, {
            type: ActionTypes.AddItemSuccess,
        })
        expect(state.status).toBe(Statuses.Success)
        expect(state.phrase).toBe("")
        expect(state.translation).toBe("")
        expect(state.errorMessage).toBe("")
        expect(state.successMessage).toBe("Item has beed saved successfully.")
    })
})
