import { ActionTypes } from "./actions"
import reducer from "./reducer"

describe("vocabulary flashcards reducer", () => {
    it("should return initial state", () => {
        expect(reducer(undefined, {
            type: "init",
        })).toEqual({
            currentId: null,
            ids: [],
            showFront: true,
        })
    })

    it("should handle init action", () => {
        const state = reducer(undefined, {
            type: ActionTypes.Init,
            params: {
                ids: ["2", "1", "3"],
            },
        })
        expect(state.ids).toEqual(["2", "1", "3"])
        expect(state.currentId).toBe("2")
        expect(state.showFront).toBe(true)
    })

    it("should handle set current card action", () => {
        const state = reducer(undefined, {
            type: ActionTypes.SetCurrentCard,
            params: {
                id: "123",
            },
        })
        expect(state.currentId).toBe("123")
    })

    it("should handle flip current card action", () => {
        let state = reducer(undefined, {
            type: ActionTypes.FlipCurrentCard,
        })
        expect(state.showFront).toBe(false)

        state = reducer({
            ids: [],
            currentId: null,
            showFront: false,
        }, {
            type: ActionTypes.FlipCurrentCard,
        })
        expect(state.showFront).toBe(true)
    })
})
