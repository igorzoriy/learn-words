import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    STATUS_INIT,
    STATUS_REQUEST,
    STATUS_SUCCESS,
    STATUS_FAILURE,
} from '../api/constants'
import PageTitle from '../components/PageTitle'
import Preloader from '../components/Preloader'
import EmptyList from '../components/EmptyList'
import Flashcard from '../components/Flashcard'
import { getVocabularyItems } from '../vocabulary/actions'
import {
    initFlashcards,
    flipCurrentFlashcard,
    swipeCurrentFlashcard,
} from './actions'

export class FlashcardsPage extends Component {
    constructor (props) {
        super(props)

        const { dispatch } = props
        dispatch(getVocabularyItems()).then(() => {
            dispatch(initFlashcards())
        })
    }

    handleTap = () => {
        this.props.dispatch(flipCurrentFlashcard())
    }

    handleSwipeLeft = () => {
        this.props.dispatch(swipeCurrentFlashcard(true))
    }

    handleSwipeRight = () => {
        this.props.dispatch(swipeCurrentFlashcard(false))
    }

    renderCardContent (card) {
        return <Flashcard { ...card }
            handleTap={ this.handleTap }
            handleSwipeLeft={ this.handleSwipeLeft }
            handleSwipeRight={ this.handleSwipeRight }
            key="card" />
    }

    render () {
        const { status, isEmpty, currentCard } = this.props
        const content = []

        switch (status) {
            case STATUS_INIT:
            case STATUS_REQUEST:
                content.push(<Preloader key="preloader" />)
                break
            case STATUS_SUCCESS:
                if (isEmpty) {
                    content.push(<EmptyList key="empty" />)
                } else if (currentCard.phrase) {
                    content.push(this.renderCardContent(currentCard))
                }
                break
            case STATUS_FAILURE:
                content.push(<Alert key="error" type="danger" message="Failed to load vocabulary items." />)
                break
        }

        return (
            <div>
                <PageTitle title="Flashcards" />
                { content }
            </div>
        )
    }
}

function select (state) {
    const { status, ids, hash } = state.vocabulary.entities
    const { currentId, showFront } = state.flashcards

    let currentCard = {}
    if (hash[currentId]) {
        currentCard = {
            id: currentId,
            showFront,
            ...hash[currentId],
        }
    }

    return {
        status,
        isEmpty: !ids.length,
        currentCard,
    }
}

export default connect(select)(FlashcardsPage)
