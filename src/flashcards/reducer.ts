import { IFlashcardsState as IState, initialStoreState } from "../types"
import { createReducer } from "../utils"
import { ActionTypes, ISetDataAction } from "./actions"

const initialState = initialStoreState.flashcards

const reducerMap = {
    [ActionTypes.SetData]: (state: IState, { params: { ids } }: ISetDataAction): IState => ({
        ...state,
        ids,
        currentIndex: 0,
    }),
    [ActionTypes.NextCard]: (state: IState): IState => ({
        ...state,
        currentIndex: state.currentIndex < state.ids.length - 1 ? state.currentIndex + 1 : 0,
    }),
    [ActionTypes.PrevCard]: (state: IState): IState => ({
        ...state,
        currentIndex: state.currentIndex > 0 ? state.currentIndex - 1 : state.ids.length - 1,
    }),
    [ActionTypes.FlipCurrentCard]: (state: IState): IState => ({
        ...state,
        showFront: !state.showFront,
    }),
}

export const flashcardsReducer = createReducer(reducerMap, initialState)
