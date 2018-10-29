import { IExerciseItem, initialStoreState, IStoreState } from "../types"
import {
    ActionTypes,
    addAnswer,
    calculateResult,
    initPhraseTranslationExercise,
    moveToNextQuestion,
    setPhraseTranslationExerciseData,
} from "./actions"

let items: IExerciseItem[]

describe("exercises actions", () => {
    beforeEach(() => {
        items = [
            {
                id: "2",
                variants: ["1", "2", "3", "4"],
                answer: null,
            },
            {
                id: "1",
                variants: ["1", "2", "3", "4"],
                answer: null,
            },
            {
                id: "4",
                variants: ["1", "2", "3", "4"],
                answer: null,
            },
            {
                id: "3",
                variants: ["1", "2", "3", "4"],
                answer: null,
            },
        ]
    })

    it("should create an action to init phrase translation exercise", () => {
        expect(initPhraseTranslationExercise()).toEqual({
            type: ActionTypes.InitPhraseTranslationExercise,
        })
    })

    it("should create an action to set phrase translation exercise data", () => {
        expect(setPhraseTranslationExerciseData(items)).toEqual({
            type: ActionTypes.SetPhraseTranslationExerciseData,
            params: { items },
        })
    })

    it("should create an action to add an answer to current phrase", () => {
        expect(addAnswer("id", "variantId")).toEqual({
            type: ActionTypes.AddAnswer,
            params: {
                id: "id",
                variantId: "variantId",
            },
        })
    })

    it("should create an action to move to next question", () => {
        expect(moveToNextQuestion()).toEqual({
            type: ActionTypes.MoveToNextQuestion,
        })
    })

    it("should create an action to calculate exercise result", () => {
        expect(calculateResult()).toEqual({
            type: ActionTypes.CalculateResult,
        })
    })
})
