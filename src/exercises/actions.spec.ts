import { IExerciseItem, initialStoreState, IStoreState } from "../types"
import {
    ActionTypes,
    addAnswer,
    calculateResult,
    initPhraseTranslationExecrise,
    moveToNextQuestion,
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
        const ids = ["1", "2", "3", "4", "5", "6"]
        const getState = (): IStoreState => {
            const state = {
                ...initialStoreState,
            }
            state.vocabulary.entities.ids = ids
            return state
        }
        const dispatch = jest.fn()
        initPhraseTranslationExecrise()(dispatch, getState)
        const action = dispatch.mock.calls[0][0]
        expect(action).toEqual({
            type: ActionTypes.InitPhraseTranslationExecrise,
            params: {
                ids,
            },
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
        [
            {
                currentIndex: 0,
                expectedIndex: 1,
                dispatched: true,
            },
            {
                currentIndex: 1,
                expectedIndex: 2,
                dispatched: true,
            },
            {
                currentIndex: 2,
                expectedIndex: 3,
                dispatched: true,
            },
            {
                currentIndex: 3,
                expectedIndex: 3,
                dispatched: false,
            },
        ].forEach(({currentIndex, expectedIndex, dispatched}) => {
            const getState = (): IStoreState => {
                const state = {
                    ...initialStoreState,
                }
                state.exercises = {
                    currentIndex,
                    items,
                    result: -1,
                }
                return state
            }

            const dispatch = jest.fn()
            moveToNextQuestion()(dispatch, getState)
            if (!dispatched) {
                expect(dispatch).not.toHaveBeenCalled()
                return
            }

            const action = dispatch.mock.calls[0][0]
            expect(dispatch).toHaveBeenCalled()
            expect(action.type).toBe(ActionTypes.MoveToNextQuestion)
            expect(action.params.index).toBe(expectedIndex)
        })
    })

    it("should create an action to calculate exercise result", () => {
        expect(calculateResult()).toEqual({
            type: ActionTypes.CalculateResult,
        })
    })
})
