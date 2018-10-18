import { IAction, IFlashcardsState, initialStoreState } from "../types"
import { ActionTypes, IParams } from "./actions"

const initialState = initialStoreState.flashcards

export default (state: IFlashcardsState = initialState, action: IAction<IParams>): IFlashcardsState => {
    const { type, params } = action

    if (type === ActionTypes.Init) {
        return {
            ...state,
            ids: params.ids,
            currentId: params.ids[0] || null,
            showFront: true,
        }
    } else if (type === ActionTypes.SetCurrentCard) {
        return {
            ...state,
            currentId: params.id,
        }
    } else if (type === ActionTypes.FlipCurrentCard) {
        return {
            ...state,
            showFront: !state.showFront,
        }
    }

    return state
}
