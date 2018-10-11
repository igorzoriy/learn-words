import { Statuses } from "../types"
import {
    ActionTypes,
    addVocabularyItem,
    clearVocabularyform,
    editVocabularyItem,
    fetchVocabularyItems,
    fillVocabularyForm,
    getVocabularyItems,
    removeVocabularyItem,
    updateVocabularyForm,
} from "./actions"

describe("vocabulary actions", () => {
    it("should create an action to fetch vocabulary list", () => {
        expect(fetchVocabularyItems()).toEqual({
            type: ActionTypes.Fetch,
        })
    })

    it("should create an action to get vocabulary list", () => {
        const dispatch = jest.fn()
        const getStateService = (ids: number[], status: Statuses) => {
            return () => {
                return {
                    vocabulary: {
                        entities: {
                            ids,
                            status,
                        },
                    },
                }
            }
        }
        getVocabularyItems()(dispatch, getStateService([], Statuses.Init))
        expect(dispatch.mock.calls[0][0]).toEqual({
            type: ActionTypes.Fetch,
        })
        expect(dispatch).toHaveBeenCalledTimes(1)
        getVocabularyItems()(dispatch, getStateService([1, 2, 3], Statuses.Success))
        expect(dispatch).toHaveBeenCalledTimes(1)
        getVocabularyItems()(dispatch, getStateService([], Statuses.Success))
        expect(dispatch).toHaveBeenCalledTimes(1)
    })

    it("should create an action to add vocabulary item", () => {
        expect(addVocabularyItem("foo", "bar")).toEqual({
            type: ActionTypes.AddItem,
            params: {
                phrase: "foo",
                translation: "bar",
            },
        })
    })

    it("should create an action to edit vocabulary item", () => {
        expect(editVocabularyItem("id", "foo", "bar")).toEqual({
            type: ActionTypes.EditItem,
            params: {
                id: "id",
                phrase: "foo",
                translation: "bar",
            },
        })
    })

    it("should create an action to remove vocabulary item", () => {
        expect(removeVocabularyItem("id1")).toEqual({
            type: ActionTypes.RemoveItem,
            params: {
                id: "id1",
            },
        })
    })

    it("should create an action to fill vocabulary form", () => {
        expect(fillVocabularyForm("id2")).toEqual({
            type: ActionTypes.FillForm,
            params: {
                id: "id2",
            },
        })
    })

    it("should create an action to clear vocabulary form", () => {
        expect(clearVocabularyform()).toEqual({
            type: ActionTypes.ClearForm,
        })
    })

    it("should create an action to update vocabulary form", () => {
        expect(updateVocabularyForm("foo2", "bar2")).toEqual({
            type: ActionTypes.UpdateForm,
            params: {
                phrase: "foo2",
                translation: "bar2",
            },
        })
    })
})
