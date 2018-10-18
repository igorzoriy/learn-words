import { IExerciseItem, IExercisesState, initialStoreState } from "../types"
import { arrayShuffle, getRandomItemsFromArray } from "../utils"
import { Action, ActionTypes } from "./actions"

const initialState = initialStoreState.exercises

export default (state: IExercisesState = initialState, action: Action): IExercisesState => {
    const { type, params } = action

    switch (type) {
        case ActionTypes.InitPhraseTranslationExecrise:
            const { ids } = params

            const items: IExerciseItem[] = arrayShuffle(ids).map((id): IExerciseItem => {
                const rightAnwer = [id]
                const variants = arrayShuffle(getRandomItemsFromArray(ids, 3, rightAnwer).concat(rightAnwer))
                return {
                    id,
                    variants,
                    answer: null,
                }
            })

            return {
                ...state,
                items,
                currentIndex: 0,
                result: initialState.result,
            }

        case ActionTypes.AddAnswer:
            return {
                ...state,
                items: state.items.map((item) => {
                    if (item.id !== params.id) {
                        return {...item}
                    } else {
                        return {
                            ...item,
                            answer: params.variantId,
                        }
                    }
                }),
            }

        case ActionTypes.MoveToNextQuestion:
            return {
                ...state,
                currentIndex: params.index,
            }

        case ActionTypes.CalculateResult:
            const accumulator = state.items.reduce((acc: number, { id, answer }) => {
                return id === answer ? ++acc : acc
            }, 0)
            return {
                ...state,
                result: Math.round(100 * accumulator / state.items.length),
            }
    }

    return state
}
