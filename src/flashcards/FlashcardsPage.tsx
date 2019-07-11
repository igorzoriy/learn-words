import React, { FunctionComponent, useEffect } from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { ICard, IStoreState, Statuses } from "../types"

import { Alert } from "../components/Alert"
import EmptyList from "../components/EmptyList"
import PageTitle from "../components/PageTitle"
import Preloader from "../components/Preloader"
import {
    flipCurrentFlashcard,
    initFlashcards,
    nextFlashcard,
    prevFlashcard,
} from "./actions"
import { Flashcard } from "./Flashcard"

interface IProps {
    init: () => void
    flip: () => void
    prev: () => void
    next: () => void
    status: Statuses
    isEmpty: boolean
    showFront: boolean
    card: ICard
}

export const FlashcardsPage: FunctionComponent<IProps> = ({
    init,
    flip,
    prev,
    next,
    status,
    isEmpty,
    showFront,
    card,
}) => {
    useEffect(() => {
        init()
    }, [])

    const content = isEmpty ? <EmptyList key="empty" /> : <Flashcard
        {...card}
        showFront={showFront}
        onTap={flip}
        onSwipeLeft={next}
        onSwipeRight={prev}
        key="card"
    />

    return (
        <div>
            <PageTitle title="Flashcards" />
            {status === Statuses.Init && <Preloader key="preloader" />}
            {status === Statuses.Request && <Preloader key="preloader" />}
            {status === Statuses.Failure &&
                <Alert key="error" type="danger" message="Failed to load vocabulary items." />}
            {status === Statuses.Success && content}
        </div>
    )
}

const mapStateToProps = (state: IStoreState): Partial<IProps> => {
    const { status, hash } = state.vocabulary.entities
    const { ids, currentIndex, showFront } = state.flashcards

    let card: ICard
    const id = ids[currentIndex]
    if (hash[id]) {
        card = {
            id,
            ...hash[id],
        }
    }

    return {
        status,
        isEmpty: !ids.length,
        card,
        showFront,
    }
}

const mapDispatchToProps = (dispatch: Dispatch): Partial<IProps> => ({
    init: () => dispatch(initFlashcards()),
    flip: () => dispatch(flipCurrentFlashcard()),
    prev: () => dispatch(prevFlashcard()),
    next: () => dispatch(nextFlashcard()),
})

export const FlashcardsPageContainer = connect(mapStateToProps, mapDispatchToProps)(FlashcardsPage)
