import { Statuses } from "../types"
import { ActionTypes } from "./actions"
import reducer from "./entitiesReducer"

const testIds = ["id1", "id2", "id3"]
const testHash = {
    id1: {
        id: "id1",
        phrase: "phrase1",
        translation: "translation1",
    },
    id2: {
        id: "id2",
        phrase: "phrase2",
        translation: "translation2",
    },
    id3: {
        id: "id3",
        phrase: "phrase3",
        translation: "translation3",
    },
}

describe("vocabulary entities reducer", () => {
    it("should return initial state", () => {
        expect(reducer(undefined, {
            type: "init",
        })).toEqual({
            status: Statuses.Init,
            ids: [],
            hash: {},
        })
    })

    it("should handle fetch action with request status", () => {
        const state = reducer(undefined, {
            type: ActionTypes.Fetch,
            status: Statuses.Request,
        })
        expect(state.status).toBe(Statuses.Request)
    })

    it("should handle fetch action with failure status", () => {
        const state = reducer(undefined, {
            type: ActionTypes.Fetch,
            status: Statuses.Failure,
        })
        expect(state.status).toBe(Statuses.Failure)
    })

    it("should handle fetch action with success status", () => {
        let state = reducer(undefined, {
            type: ActionTypes.Fetch,
            status: Statuses.Success,
            payload: {
                list: testHash,
            },
        })
        expect(state).toEqual({
            status: Statuses.Success,
            ids: testIds,
            hash: testHash,
        })

        state = reducer({
            status: Statuses.Success,
            ids: ["id0"],
            hash: {
                id0: {
                    id: "id0",
                    phrase: "phrase0",
                    translation: "translation0",
                },
            },
        }, {
            type: ActionTypes.Fetch,
            status: Statuses.Success,
            payload: {
                list: testHash,
            },
        })
        expect(state.ids).not.toContain("id0")
        expect(state.hash.id0).toBeUndefined()
        expect(state).toEqual({
            status: Statuses.Success,
            ids: testIds,
            hash: testHash,
        })
    })

    it("should handle edit item action with success status", () => {
        let initialState
        let state
        const action = {
            type: ActionTypes.EditItem,
            status: Statuses.Success,
            params: {
                id: "id3",
                phrase: "edited-phrase3",
                translation: "edited-translation3",
            },
        }

        initialState = {
            status: Statuses.Init,
            ids: [],
            hash: {},
        }
        state = reducer(initialState, action)
        expect(state).toEqual(initialState)

        initialState = {
            status: Statuses.Success,
            ids: testIds,
            hash: testHash,
        }
        state = reducer(initialState, action)
        expect(state.hash.id3.phrase).toBe("edited-phrase3")
        expect(state.hash.id3.translation).toBe("edited-translation3")
    })

    it("should handle remove item action with success status", () => {
        const initialState = {
            status: Statuses.Success,
            ids: testIds,
            hash: testHash,
        }

        const state = reducer(initialState, {
            type: ActionTypes.RemoveItem,
            status: Statuses.Success,
            params: {
                id: "id2",
            },
        })
        expect(state.ids).not.toContain("id2")
    })
})
