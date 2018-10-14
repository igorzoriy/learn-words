import { Statuses } from "../types"
import { Action, ActionTypes } from "./actions"
import { IItem } from "./types"

interface IState {
    status: Statuses
    ids: string[]
    hash: {
        [id: string]: IItem,
    }
}

const initialState: IState = {
    status: Statuses.Init,
    ids: [],
    hash: {},
}

export default (state: IState = initialState, action: Action): IState => {
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
                    return {
                        ...state,
                        status,
                        ids: Object.keys(payload.list),
                        hash: payload.list,
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
