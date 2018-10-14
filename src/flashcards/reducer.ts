import { IAction } from "../types"
import { ActionTypes, IParams } from "./actions"

interface IState {
    currentId: string
    ids: string[]
    showFront: boolean
}

const initialState: IState = {
    currentId: null,
    ids: [],
    showFront: true,
}

export default (state = initialState, action: IAction <IParams>) => {
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
