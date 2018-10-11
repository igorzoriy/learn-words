import { Statuses } from "../types"
import { ActionTypes } from "./actions"
import reducer from "./formReducer"

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
            type: ActionTypes.UpdateForm,
            params: {
                phrase: "updated-phrase",
                translation: "updated-translation",
            },
        })
        expect(state.phrase).toBe("updated-phrase")
        expect(state.translation).toBe("updated-translation")
    })

    it("should handle add item action with init status", () => {
        const state = reducer(testInitialState, {
            type: ActionTypes.AddItem,
            status: Statuses.Init,
        })
        expect(state.status).toBe(Statuses.Init)
        expect(state.phrase).toBe("")
        expect(state.translation).toBe("")
        expect(state.errorMessage).toBe("")
        expect(state.successMessage).toBe("")
    })

    it("should handle add item action with request status", () => {
        const state = reducer(testInitialState, {
            type: ActionTypes.AddItem,
            status: Statuses.Request,
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

    it("should handle add item action with failure status", () => {
        const state = reducer(testInitialState, {
            type: ActionTypes.AddItem,
            status: Statuses.Failure,
            payload: {
                message: "error message",
            },
        })
        expect(state.status).toBe(Statuses.Failure)
        expect(state.phrase).toBe("phrase")
        expect(state.translation).toBe("translation")
        expect(state.errorMessage).toBe("error message")
        expect(state.successMessage).toBe("")
    })

    it("should handle add item action with success status", () => {
        const state = reducer(testInitialState, {
            type: ActionTypes.AddItem,
            status: Statuses.Success,
        })
        expect(state.status).toBe(Statuses.Success)
        expect(state.phrase).toBe("")
        expect(state.translation).toBe("")
        expect(state.errorMessage).toBe("")
        expect(state.successMessage).toBe("Item has beed saved successfully.")
    })

    it("should handle edit item action with request status", () => {
        const state = reducer(testInitialState, {
            type: ActionTypes.EditItem,
            status: Statuses.Request,
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

    it("should handle edit item action with failure status", () => {
        const state = reducer(testInitialState, {
            type: ActionTypes.EditItem,
            status: Statuses.Failure,
            payload: {
                message: "error message",
            },
        })
        expect(state.status).toBe(Statuses.Failure)
        expect(state.phrase).toBe("phrase")
        expect(state.translation).toBe("translation")
        expect(state.errorMessage).toBe("error message")
        expect(state.successMessage).toBe("")
    })

    it("should handle edit item action with success status", () => {
        const state = reducer(testInitialState, {
            type: ActionTypes.EditItem,
            status: Statuses.Success,
        })
        expect(state.status).toBe(Statuses.Success)
        expect(state.phrase).toBe("phrase")
        expect(state.translation).toBe("translation")
        expect(state.errorMessage).toBe("")
        expect(state.successMessage).toBe("Item has beed updated successfully.")
    })

    it("should handle should handle fill form action with request status", () => {
        const state = reducer(testInitialState, {
            type: ActionTypes.FillForm,
            status: Statuses.Request,
        })
        expect(state.status).toBe(Statuses.Request)
        expect(state.phrase).toBe("")
        expect(state.translation).toBe("")
        expect(state.errorMessage).toBe("")
        expect(state.successMessage).toBe("")
    })

    it("should handle should handle fill form action with failure status", () => {
        const state = reducer(testInitialState, {
            type: ActionTypes.FillForm,
            status: Statuses.Failure,
            payload: {
                message: "denied",
            },
        })
        expect(state.status).toBe(Statuses.Failure)
        expect(state.errorMessage).toBe("denied")
        expect(state.successMessage).toBe("")
    })

    it("should handle should handle fill form action with success status", () => {
        const state = reducer(testInitialState, {
            type: ActionTypes.FillForm,
            status: Statuses.Success,
            payload: {
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
})
