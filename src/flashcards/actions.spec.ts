import {
    ActionTypes,
    flipCurrentFlashcard,
    initFlashcards,
    setCurrentFlashcard,
    swipeCurrentFlashcard,
} from "./actions"

describe("flashcards actions", () => {
    it("should create an action to init flashcards", () => {
        let ids: string[] = []
        let getState = () => ({
            vocabulary: {
                entities: {
                    ids,
                },
            },
        })
        let dispatch = jest.fn()
        initFlashcards()(dispatch, getState)
        expect(dispatch.mock.calls[0][0]).toEqual({
            type: ActionTypes.Init,
            params: {
                ids: [],
            },
        })

        ids = ["id1", "id2"]
        getState = () => ({
            vocabulary: {
                entities: {
                    ids,
                },
            },
        })
        dispatch = jest.fn()
        initFlashcards()(dispatch, getState)
        const result = dispatch.mock.calls[0][0]
        expect(result.type).toBe(ActionTypes.Init)
        expect(result.params.ids.sort()).toEqual(ids)
    })

    it("should create an action to set current flashcard", () => {
        expect(setCurrentFlashcard("id12345")).toEqual({
            type: ActionTypes.SetCurrentCard,
            params: {
                id: "id12345",
            },
        })
    })

    it("should create an action to flip current flashcard", () => {
        expect(flipCurrentFlashcard()).toEqual({
            type: ActionTypes.FlipCurrentCard,
        })
    })

    it("should create an action to swipe current flashcard", () => {
        const getState = () => ({
            flashcards: {
                currentId: "id2",
                ids: ["id1", "id2", "id3"],
            },
        })
        const dispatch = jest.fn()

        swipeCurrentFlashcard(true)(dispatch, getState)
        swipeCurrentFlashcard(false)(dispatch, getState)

        expect(dispatch.mock.calls[0][0]).toEqual({
            type: ActionTypes.SetCurrentCard,
            params: {
                id: "id3",
            },
        })
        expect(dispatch.mock.calls[1][0]).toEqual({
            type: ActionTypes.SetCurrentCard,
            params: {
                id: "id1",
            },
        })
    })
})
