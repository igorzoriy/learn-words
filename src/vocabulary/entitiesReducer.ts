import { ICard, initialStoreState, IVocabularyEntitiesState as IState, Statuses } from "../types"
import { createReducer } from "../utils"
import { ActionTypes, IFetchSuccessAction, IItemAction, IRemoveItemAction } from "./actions"

const initialState = initialStoreState.vocabulary.entities

const reducerMap = {
    [ActionTypes.Fetch]: (state: IState): IState => ({ ...state, status: Statuses.Request }),
    [ActionTypes.FetchFailure]: (state: IState): IState => ({ ...state, status: Statuses.Failure }),
    [ActionTypes.FetchSuccess]: (state: IState, { params: { list } }: IFetchSuccessAction): IState => {
        const ids = Object.keys(list)
        const hash: {
            [id: string]: ICard,
        } = {}
        ids.forEach((id) => {
            hash[id] = { ...list[id], id }
        })
        return {
            ...state,
            status: Statuses.Success,
            ids,
            hash,
        }
    },
    [ActionTypes.AddItem]: (state: IState): IState => ({...state, status: Statuses.Request }),
    [ActionTypes.AddItemFailure]: (state: IState): IState => ({ ...state, status: Statuses.Failure }),
    [ActionTypes.AddItemSuccess]: (state: IState, { params }: IItemAction): IState => {
        const { id } = params
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
    },
    [ActionTypes.EditItemSuccess]: (state: IState, { params }: IItemAction): IState => {
        const { id } = params
        if (!state.hash[id]) {
            return state
        }

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
    },
    [ActionTypes.RemoveItemSuccess]: (state: IState, { params: { id } }: IRemoveItemAction): IState => {
        const ids = [...state.ids]
        ids.splice(ids.indexOf(id), 1)
        return {
            ...state,
            ids,
        }
    },
}

export default createReducer(reducerMap, initialState)
