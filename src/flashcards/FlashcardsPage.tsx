import * as React from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { ICard, IStoreState, Statuses } from "../types"

import Alert from "../components/Alert"
import EmptyList from "../components/EmptyList"
import PageTitle from "../components/PageTitle"
import Preloader from "../components/Preloader"
import { getVocabularyItems } from "../vocabulary/actions"
import {
    flipCurrentFlashcard,
    initFlashcards,
    nextFlashcard,
    prevFlashcard,
} from "./actions"
import Flashcard from "./Flashcard"

interface IProps {
    dispatch: Dispatch
    status: Statuses
    isEmpty: boolean
    showFront: boolean
    card: ICard
}

export class FlashcardsPage extends React.PureComponent<IProps> {
    constructor(props: IProps) {
        super(props)
        props.dispatch(getVocabularyItems())
    }

    public componentDidUpdate(prevProps: IProps) {
        if (prevProps.status === Statuses.Request && this.props.status === Statuses.Success) {
            this.props.dispatch(initFlashcards())
        }
    }

    private handleTap = () => {
        this.props.dispatch(flipCurrentFlashcard())
    }

    private handleSwipeLeft = () => {
        this.props.dispatch(nextFlashcard())
    }

    private handleSwipeRight = () => {
        this.props.dispatch(prevFlashcard())
    }

    private renderCardContent(card: ICard, showFront: boolean) {
        return <Flashcard
            {...card}
            showFront={showFront}
            handleTap={this.handleTap}
            handleSwipeLeft={this.handleSwipeLeft}
            handleSwipeRight={this.handleSwipeRight}
            key="card"
        />
    }

    public render() {
        const { status, isEmpty, card, showFront } = this.props
        const content = []

        switch (status) {
            case Statuses.Init:
            case Statuses.Request:
                content.push(<Preloader key="preloader" />)
                break
            case Statuses.Success:
                if (isEmpty) {
                    content.push(<EmptyList key="empty" />)
                } else {
                    content.push(this.renderCardContent(card, showFront))
                }
                break
            case Statuses.Failure:
                content.push(<Alert key="error" type="danger" message="Failed to load vocabulary items." />)
                break
        }

        return (
            <div>
                <PageTitle title="Flashcards" />
                {content}
            </div>
        )
    }
}

function select(state: IStoreState) {
    const { status, hash } = state.vocabulary.entities
    const { ids, currentIndex, showFront } = state.flashcards

    let card = {}
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

export default connect(select)(FlashcardsPage)
