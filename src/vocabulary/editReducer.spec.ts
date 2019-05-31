import { Statuses } from "../types"
import { ActionTypes } from "./actions"
import { editReducer as reducer } from "./editReducer"

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

    it("should handle should handle fill form action with request status", () => {
        const state = reducer(testInitialState, {
            type: ActionTypes.FillEditForm,
        })
        expect(state.status).toBe(Statuses.Request)
        expect(state.phrase).toBe("")
        expect(state.translation).toBe("")
        expect(state.errorMessage).toBe("")
        expect(state.successMessage).toBe("")
    })

    it("should handle should handle fill form failure action", () => {
        const state = reducer(testInitialState, {
            type: ActionTypes.FillEditFormFailure,
            params: {
                message: "denied",
            },
        })
        expect(state.status).toBe(Statuses.Failure)
        expect(state.errorMessage).toBe("denied")
        expect(state.successMessage).toBe("")
    })

    it("should handle should handle fill form success action", () => {
        const state = reducer(testInitialState, {
            type: ActionTypes.FillEditFormSuccess,
            params: {
                phrase: "fetched-phrase",
                translation: "fetched-translation",
            },
        })
        expect(state.status).toBe(Statuses.Success)
        expect(state.phrase).toBe("fetched-phrase")
        expect(state.translation).toBe("fetched-translation")
        expect(state.errorMessage).toBe("")
        expect(state.successMessage).toBe("")
    })

    it("should handle update form action", () => {
        const state = reducer(testInitialState, {
            type: ActionTypes.UpdateEditForm,
            params: {
                phrase: "updated-phrase",
                translation: "updated-translation",
            },
        })
        expect(state.phrase).toBe("updated-phrase")
        expect(state.translation).toBe("updated-translation")
    })

    it("should handle edit item action", () => {
        const state = reducer(testInitialState, {
            type: ActionTypes.EditItem,
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

    it("should handle edit item failure action", () => {
        const state = reducer(testInitialState, {
            type: ActionTypes.EditItemFailure,
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

    it("should handle edit item success action", () => {
        const state = reducer(testInitialState, {
            type: ActionTypes.EditItemSuccess,
        })
        expect(state.status).toBe(Statuses.Success)
        expect(state.phrase).toBe("phrase")
        expect(state.translation).toBe("translation")
        expect(state.errorMessage).toBe("")
        expect(state.successMessage).toBe("Item has beed updated successfully.")
    })
})
