import { ICard, initialStoreState, IVocabularyEntitiesState, Statuses } from "../types"
import { Action, ActionTypes } from "./actions"

const initialState = initialStoreState.vocabulary.entities

export default (state: IVocabularyEntitiesState = initialState, action: Action): IVocabularyEntitiesState => {
    const { type, status, params, payload } = action

    switch (type) {
        case ActionTypes.Fetch:
            switch (status) {
                case Statuses.Request:
                case Statuses.Failure:
                    return {
                        ...state,
                        status,
                    }
                case Statuses.Success:
                    const ids = Object.keys(payload.list)
                    const hash: {
                        [id: string]: ICard,
                    } = {}
                    ids.forEach((id) => {
                        hash[id] = { ...payload.list[id], id }
                    })
                    return {
                        ...state,
                        status,
                        ids,
                        hash,
                    }
            }

        case ActionTypes.AddItem: {
            if (status === Statuses.Success) {
                const { id } = payload
                const ids = state.ids.concat(id)
                const hash = { ...state.hash }
                hash[id] = {
                    id,
                    phrase: params.phrase,
                    translation: params.translation,
                }
                return {
                    ...state,
                    ids,
                    hash,
                }
            }
        }

        case ActionTypes.EditItem: {
            const { id } = params
            if (status === Statuses.Success && state.hash[id]) {
                const hash = { ...state.hash }
                hash[id] = {
                    id,
                    phrase: params.phrase,
                    translation: params.translation,
                }

                return {
                    ...state,
                    hash,
                }
            }
        }

        case ActionTypes.RemoveItem: {
            const { id } = params
            if (status === Statuses.Success) {
                const ids = [...state.ids]
                ids.splice(ids.indexOf(id), 1)
                return {
                    ...state,
                    ids,
                }
            }
        }
    }

    return state
}
