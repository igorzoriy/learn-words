import { connect } from "react-redux"
import { Dispatch } from "redux"
import { ICard, IStoreState } from "../types"
import {
    addAnswer,
    calculateResult,
    initPhraseTranslationExercise,
    moveToNextQuestion,
} from "./actions"
import { IProps, PhraseTranslationPage } from "./PhraseTranslationPage"

const mapStateToProps = (state: IStoreState): Partial<IProps> => {
    const { status, hash } = state.vocabulary.entities
    const { items, currentIndex, result } = state.exercises

    let currentId: string
    let current: ICard
    let variants: ICard[]
    if (!items[currentIndex]) {
        currentId = null
        current = null
        variants = []
    } else {
        currentId = items[currentIndex].id
        current = hash[currentId]
        variants = items[currentIndex].variants.map((id) => hash[id])
    }

    return {
        result,
        status,
        items,
        currentIndex,
        current,
        variants,
    }
}

const mapDispatchToProps = (dispatch: Dispatch): Partial<IProps> => ({
    init: () => dispatch(initPhraseTranslationExercise()),
    addAnswer: (id: string, variantId: string) => dispatch(addAnswer(id, variantId)),
    moveToNextQuestion: () => dispatch(moveToNextQuestion()),
    calculateResult: () => dispatch(calculateResult()),
})

export const PhraseTranslationPageContainer = connect(mapStateToProps, mapDispatchToProps)(PhraseTranslationPage)
