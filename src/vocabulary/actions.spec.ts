import {
    ActionTypes,
    addVocabularyItem,
    addVocabularyItemsFailure,
    addVocabularyItemSuccess,
    clearVocabularyForm,
    editVocabularyItem,
    editVocabularyItemFailure,
    editVocabularyItemSuccess,
    fetchVocabularyItems,
    fetchVocabularyItemsFailure,
    fetchVocabularyItemsSuccess,
    fillVocabularyForm,
    fillVocabularyFormFailure,
    fillVocabularyFormSuccess,
    getVocabularyItems,
    removeVocabularyItem,
    removeVocabularyItemSuccess,
} from "./actions"

describe("vocabulary actions", () => {
    it("should create an action to clear vocabulary form", () => {
        expect(clearVocabularyForm()).toEqual({
            type: ActionTypes.ClearForm,
        })
    })

    it("should create actions to fill vocabulary form", () => {
        expect(fillVocabularyForm("id1")).toEqual({
            type: ActionTypes.FillEditForm,
            params: {
                id: "id1",
            },
        })

        expect(fillVocabularyFormFailure("error message")).toEqual({
            type: ActionTypes.FillEditFormFailure,
            params: {
                message: "error message",
            },
        })

        expect(fillVocabularyFormSuccess({
            id: "id2",
            phrase: "ph2",
            translation: "tr2",
        })).toEqual({
            type: ActionTypes.FillEditFormSuccess,
            params: {
                id: "id2",
                phrase: "ph2",
                translation: "tr2",
            },
        })
    })

    it("should create actions to fetch vocabulary list", () => {
        expect(fetchVocabularyItems()).toEqual({
            type: ActionTypes.Fetch,
        })

        expect(fetchVocabularyItemsSuccess({})).toEqual({
            type: ActionTypes.FetchSuccess,
            params: {
                list: {},
            },
        })
        expect(fetchVocabularyItemsFailure("error message")).toEqual({
            type: ActionTypes.FetchFailure,
            params: {
                message: "error message",
            },
        })
    })

    it("should create an action to get vocabulary list", () => {
        expect(getVocabularyItems()).toEqual({
            type: ActionTypes.Get,
        })
    })

    it("should create actions to add vocabulary item", () => {
        expect(addVocabularyItem("foo", "bar")).toEqual({
            type: ActionTypes.AddItem,
            params: {
                id: "",
                phrase: "foo",
                translation: "bar",
            },
        })

        expect(addVocabularyItemsFailure("some error")).toEqual({
            type: ActionTypes.AddItemFailure,
            params: {
                message: "some error",
            },
        })

        expect(addVocabularyItemSuccess({
            id: "id",
            phrase: "foo",
            translation: "bar",
        })).toEqual({
            type: ActionTypes.AddItemSuccess,
            params: {
                id: "id",
                phrase: "foo",
                translation: "bar",
            },
        })
    })

    it("should create actions to edit vocabulary item", () => {
        expect(editVocabularyItem({
            id: "id",
            phrase: "foo",
            translation: "bar",
        })).toEqual({
            type: ActionTypes.EditItem,
            params: {
                id: "id",
                phrase: "foo",
                translation: "bar",
            },
        })

        expect(editVocabularyItemFailure("edit error")).toEqual({
            type: ActionTypes.EditItemFailure,
            params: {
                message: "edit error",
            },
        })

        expect(editVocabularyItemSuccess({
            id: "id",
            phrase: "foo",
            translation: "bar",
        })).toEqual({
            type: ActionTypes.EditItemSuccess,
            params: {
                id: "id",
                phrase: "foo",
                translation: "bar",
            },
        })
    })

    it("should create actions to remove vocabulary item", () => {
        expect(removeVocabularyItem("id1")).toEqual({
            type: ActionTypes.RemoveItem,
            params: {
                id: "id1",
            },
        })

        expect(removeVocabularyItemSuccess("id1")).toEqual({
            type: ActionTypes.RemoveItemSuccess,
            params: {
                id: "id1",
            },
        })
    })
})
