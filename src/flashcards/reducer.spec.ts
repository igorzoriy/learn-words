import { ActionTypes } from "./actions"
import reducer from "./reducer"

const initialState = {
    ids: ["2", "1", "3"],
    currentIndex: 0,
    showFront: true,
}

describe("vocabulary flashcards reducer", () => {
    it("should return initial state", () => {
        expect(reducer(undefined, {
            type: "init",
        })).toEqual({
            ids: [],
            currentIndex: -1,
            showFront: true,
        })
    })

    it("should handle set data action", () => {
        const state = reducer(undefined, {
            type: ActionTypes.SetData,
            params: {
                ids: ["2", "1", "3"],
            },
        })
        expect(state.ids).toEqual(["2", "1", "3"])
        expect(state.currentIndex).toBe(0)
        expect(state.showFront).toBe(true)
    })

    it("should handle next card action", () => {
        let state = reducer(initialState, {
            type: ActionTypes.NextCard,
        })
        expect(state.currentIndex).toBe(1)

        state = reducer(state, {
            type: ActionTypes.NextCard,
        })
        expect(state.currentIndex).toBe(2)

        state = reducer(state, {
            type: ActionTypes.NextCard,
        })
        expect(state.currentIndex).toBe(0)
    })

    it("should handle prev card action", () => {
        let state = reducer(initialState, {
            type: ActionTypes.PrevCard,
        })
        expect(state.currentIndex).toBe(2)

        state = reducer(state, {
            type: ActionTypes.PrevCard,
        })
        expect(state.currentIndex).toBe(1)

        state = reducer(state, {
            type: ActionTypes.PrevCard,
        })
        expect(state.currentIndex).toBe(0)
    })

    it("should handle flip current card action", () => {
        let state = reducer(initialState, {
            type: ActionTypes.FlipCurrentCard,
        })
        expect(state.showFront).toBe(false)

        state = reducer(state, {
            type: ActionTypes.FlipCurrentCard,
        })
        expect(state.showFront).toBe(true)
    })
})
