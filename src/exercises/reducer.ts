import { IExercisesState as IState, initialStoreState } from "../types"
import { createReducer } from "../utils"
import { ActionTypes, IAddAnswerAction, ISetExerciseDataAction } from "./actions"

const initialState = initialStoreState.exercises

const reducerMap = {
    [ActionTypes.SetPhraseTranslationExerciseData]: (state: IState, { params: { items } }: ISetExerciseDataAction):
        IState => ({
            ...state,
            items,
            currentIndex: 0,
            result: initialState.result,
        }),
    [ActionTypes.AddAnswer]: (state: IState, { params: { id, variantId } }: IAddAnswerAction): IState => ({
        ...state,
        items: state.items.map((item) => {
            if (item.id !== id) {
                return { ...item }
            } else {
                return {
                    ...item,
                    answer: variantId,
                }
            }
        }),
    }),
    [ActionTypes.MoveToNextQuestion]: (state: IState): IState => ({
        ...state,
        currentIndex: state.items.length - 1 === state.currentIndex ? null : state.currentIndex + 1,
    }),
    [ActionTypes.CalculateResult]: (state: IState): IState => {
        const accumulator = state.items.reduce((acc: number, { id, answer }) => {
            return id === answer ? ++acc : acc
        }, 0)
        return {
            ...state,
            result: Math.round(100 * accumulator / state.items.length),
        }
    },
}

export const exercisesReducer = createReducer(reducerMap, initialState)
