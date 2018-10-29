import {
    ActionTypes,
    flipCurrentFlashcard,
    initFlashcards,
    nextFlashcard,
    prevFlashcard,
    setFlashcardsData,
} from "./actions"

describe("flashcards actions", () => {
    it("should create an action to init flashcards", () => {
        expect(initFlashcards()).toEqual({
            type: ActionTypes.Init,
        })
    })

    it("should create an action to set flashcards data", () => {
        expect(setFlashcardsData(["1", "3", "2"])).toEqual({
            type: ActionTypes.SetData,
            params: {
                ids: ["1", "3", "2"],
            },
        })
    })

    it("should create an action to next flashcard", () => {
        expect(nextFlashcard()).toEqual({
            type: ActionTypes.NextCard,
        })
    })

    it("should create an action to prev flashcard", () => {
        expect(prevFlashcard()).toEqual({
            type: ActionTypes.PrevCard,
        })
    })

    it("should create an action to flip current flashcard", () => {
        expect(flipCurrentFlashcard()).toEqual({
            type: ActionTypes.FlipCurrentCard,
        })
    })
})
