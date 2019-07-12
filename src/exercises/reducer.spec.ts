import { IExerciseItem, IExercisesState as IState } from "../types"
import { ActionTypes } from "./actions"
import { exercisesReducer as reducer } from "./reducer"

let items: IExerciseItem[]

describe("exercises reducer", () => {
    beforeEach(() => {
        items = [
            {
                id: "1",
                variants: ["1", "2", "3", "4"],
                answer: null,
            },
            {
                id: "2",
                variants: ["1", "2", "3", "4"],
                answer: null,
            },
            {
                id: "3",
                variants: ["1", "2", "3", "4"],
                answer: null,
            },
            {
                id: "4",
                variants: ["1", "2", "3", "4"],
                answer: null,
            },
            {
                id: "5",
                variants: ["1", "2", "3", "5"],
                answer: null,
            },
            {
                id: "6",
                variants: ["1", "2", "3", "6"],
                answer: null,
            },
        ]
    })

    it("should return initial state", () => {
        expect(reducer(undefined, {
            type: "init",
        })).toEqual({
            items: [],
            currentIndex: -1,
            result: -1,
        })
    })

    it("should handle set phrase translation exercise data", () => {
        const state: IState = reducer(undefined, {
            type: ActionTypes.SetPhraseTranslationExerciseData,
            params: {
                items,
            },
        })
        expect(state.items.length).toBe(6)
        expect(state.currentIndex).toBe(0)
        expect(state.result).toBe(-1)
    })

    it("should handle add answer action", () => {
        let state: IState = reducer({
            items,
            currentIndex: 0,
            result: -1,
        }, {
            type: ActionTypes.AddAnswer,
            params: {
                id: "1",
                variantId: "1",
            },
        })
        state = reducer(state, {
            type: ActionTypes.AddAnswer,
            params: {
                id: "2",
                variantId: "3",
            },
        })
        expect(state.items).not.toEqual(items)
        expect(state.items.find(({id}) => id === "1").answer).toBe("1")
        expect(state.items.find(({id}) => id === "2").answer).toBe("3")
    })

    it("should handle move to next question action", () => {
        const state: IState = reducer({
            items,
            currentIndex: 1,
            result: -1,
        }, {
            type: ActionTypes.MoveToNextQuestion,
        })
        expect(state.currentIndex).toBe(2)
    })

    it("should handle calculate result action", () => {
        let state = reducer({
            items,
            result: -1,
            currentIndex: 0,
        }, {
            type: ActionTypes.CalculateResult,
        })
        expect(state.result).toBe(0)

        items[0].answer = "1"
        items[1].answer = "2"
        items[2].answer = "3"
        items[3].answer = "4"
        items[4].answer = "5"
        items[5].answer = "6"
        state = reducer({
            items,
            result: -1,
            currentIndex: 0,
        }, {
            type: ActionTypes.CalculateResult,
        })
        expect(state.result).toBe(100)

        items[0].answer = "1"
        items[1].answer = "1"
        items[2].answer = "1"
        items[3].answer = "1"
        items[4].answer = "1"
        items[5].answer = "1"
        state = reducer({
            items,
            result: -1,
            currentIndex: 0,
        }, {
            type: ActionTypes.CalculateResult,
        })
        expect(state.result).toBe(17)

        items[0].answer = "1"
        items[1].answer = "2"
        items[2].answer = "3"
        items[3].answer = "4"
        items[4].answer = "1"
        items[5].answer = "1"
        state = reducer({
            items,
            result: -1,
            currentIndex: 0,
        }, {
            type: ActionTypes.CalculateResult,
        })
        expect(state.result).toBe(67)
    })
})
