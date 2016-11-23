import React, { Component } from 'react'
import { connect } from 'react-redux'
import PageTitle from '../components/PageTitle'
import Preloader from '../components/Preloader'
import EmptyList from '../components/EmptyList'
import Button from '../components/Button'
import { getVocabularyItems } from '../vocabulary/actions'
import {
    initPhraseTranslationExecrise,
    addAnswer,
    moveToNextQuestion,
    calculateResult,
} from './actions'
import {
    STATUS_INIT,
    STATUS_REQUEST,
    STATUS_SUCCESS,
    STATUS_FAILURE,
} from '../api/constants'

export class PhraseTranslationPage extends Component {
    constructor (props) {
        super(props)
        const { dispatch } = props
        dispatch(getVocabularyItems()).then(() => {
            this.handleStart()
        })
    }

    handleStart = () => {
        this.props.dispatch(initPhraseTranslationExecrise())
    }

    handleAnswer (id, variant) {
        this.props.dispatch(addAnswer(id, variant.id))
    }

    handleNext = () => {
        this.props.dispatch(moveToNextQuestion())
    }

    handleResult = () => {
        this.props.dispatch(calculateResult())
    }

    renderNextButton = () => {
        return (
            <Button
                modifiers={ ['btn', 'btn-info'] }
                onClick={ this.handleNext }
                key="next-btn"
            >
                Next
            </Button>
        )
    }

    renderResultButton = () => {
        return (
            <Button
                modifiers={ ['btn', 'btn-info'] }
                onClick={ this.handleResult }
                key="result-btn"
            >
                Result
            </Button>
        )
    }

    renderExercise () {
        let { hash, currentId, currentIndex, variants, answer, items } = this.props

        return (
            <div key="exercise">
                <div className="exercise-card">
                    { hash[currentId].phrase }
                </div>
                { variants.map((variant) => {
                    let classNames = ['btn']
                    if (answer && currentId === answer) {
                        classNames.push(currentId === variant.id ? 'btn-success' : 'btn-warning')
                    } else if (answer && currentId !== answer) {
                        classNames.push(currentId === variant.id ? 'btn-success' : 'btn-danger')
                    } else {
                        classNames.push('btn-warning')
                    }
                    return (
                        <Button
                            modifiers={ classNames }
                            onClick={ this.handleAnswer.bind(this, currentId, variant) }
                            disabled={ !!answer }
                            key={ variant.id }
                        >
                            { variant.translation }
                        </Button>
                    )
                }) }

                <div className="exercise-counter">
                    { currentIndex + 1 }&nbsp;/&nbsp;{ items.length }
                </div>
                { currentIndex === items.length - 1 ? this.renderResultButton() : this.renderNextButton() }
            </div>
        )
    }

    renderResult (result) {
        /*eslint no-magic-numbers: 0 */
        return (
            <div key="result">
                <div className="exercise-card">
                    Your result is {result * 100} %
                </div>
                <Button
                    modifiers={ ['btn', 'btn-info'] }
                    onClick={ this.handleStart }
                    key="start-btn"
                >
                    Start New Exercise
                </Button>
            </div>
        )
    }

    render () {
        let { status, items, result } = this.props
        const content = []

        switch (status) {
            case STATUS_INIT:
            case STATUS_REQUEST:
                content.push(<Preloader key="preloader" />)
                break
            case STATUS_SUCCESS:
                if (!items.length) {
                    content.push(<EmptyList key="empty" />)
                } else {
                    content.push(result === -1 ? this.renderExercise() : this.renderResult(result))
                }
                break
            case STATUS_FAILURE:
                content.push(<Alert key="error" type="danger" message="Failed to load vocabulary items." />)
                break
        }

        return (
            <div>
                <PageTitle title="Phrase-Translation" />
                { content }
            </div>
        )
    }
}

function select (state) {
    let { status, hash } = state.vocabulary.entities
    let { items, currentId, currentIndex, result } = state.exercises

    let { variants = [], answer = null } = items.find((item) => item.id === currentId) || {}
    variants = variants.map((id) => {
        return {
            id,
            translation: hash[id].translation,
        }
    })

    return {
        result,
        status,
        items,
        hash,
        currentId,
        currentIndex,
        variants,
        answer,
    }
}

export default connect(select)(PhraseTranslationPage)
