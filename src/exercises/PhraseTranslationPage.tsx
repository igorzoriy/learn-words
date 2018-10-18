import * as React from "react"
import { connect } from "react-redux"
import { ThunkDispatch } from "redux-thunk"
import Alert from "../components/Alert"
import Button from "../components/Button"
import EmptyList from "../components/EmptyList"
import PageTitle from "../components/PageTitle"
import Preloader from "../components/Preloader"
import { ICard, IExerciseItem, IStoreState, Statuses } from "../types"
import { getVocabularyItems } from "../vocabulary/actions"
import {
    Action,
    addAnswer,
    calculateResult,
    initPhraseTranslationExecrise,
    moveToNextQuestion,
} from "./actions"

interface IProps {
    dispatch?: ThunkDispatch<{}, {}, Action>,
    status: Statuses,
    result: number,
    items: IExerciseItem[],
    currentIndex: number,
    current: ICard,
    variants: ICard[],
}

export class PhraseTranslationPage extends React.PureComponent<IProps> {
    constructor(props: IProps) {
        super(props)
        const { dispatch } = props
        dispatch(getVocabularyItems())
    }

    public componentDidUpdate(prevProps: IProps) {
        if (prevProps.status === Statuses.Request && this.props.status === Statuses.Success) {
            this.handleStart()
        }
    }

    private handleStart = () => {
        this.props.dispatch(initPhraseTranslationExecrise())
    }

    public handleAnswer(id: string, variantId: string) {
        this.props.dispatch(addAnswer(id, variantId))
    }

    private handleNext = () => {
        this.props.dispatch(moveToNextQuestion())
    }

    private handleResult = () => {
        this.props.dispatch(calculateResult())
    }

    private renderNextButton = () => {
        return (
            <Button
                modifiers={["btn", "btn-info"]}
                onClick={this.handleNext}
                key="next-btn"
            >
                Next
            </Button>
        )
    }

    private renderResultButton = () => {
        return (
            <Button
                modifiers={["btn", "btn-info"]}
                onClick={this.handleResult}
                key="result-btn"
            >
                Result
            </Button>
        )
    }

    private renderExercise(items: IExerciseItem[], currentIndex: number, current: ICard, variants: ICard[]) {
        const { answer, id: currentId } = items[currentIndex]

        return (
            <div key="exercise">
                <div className="exercise-card">
                    {current.phrase}
                </div>
                { variants.map((variant) => {
                    const classNames = ["btn"]
                    if (answer && currentId === answer) {
                        classNames.push(currentId === variant.id ? "btn-success" : "btn-warning")
                    } else if (answer && currentId !== answer) {
                        classNames.push(currentId === variant.id ? "btn-success" : "btn-danger")
                    } else {
                        classNames.push("btn-warning")
                    }
                    return (
                        <Button
                            modifiers={classNames}
                            onClick={this.handleAnswer.bind(this, currentId, variant.id)}
                            disabled={!!answer}
                            key={variant.id}
                        >
                            {variant.translation}
                        </Button>
                    )
                }) }

                <div className="exercise-counter">
                    {currentIndex + 1}&nbsp;/&nbsp;{items.length}
                </div>
                {currentIndex === items.length - 1 ? this.renderResultButton() : this.renderNextButton()}
            </div>
        )
    }

    public renderResult(result: number) {
        return (
            <div key="result">
                <div className="exercise-card">
                    Your result is {result} %
                </div>
                <Button
                    modifiers={["btn", "btn-info"]}
                    onClick={this.handleStart}
                    key="start-btn"
                >
                    Start New Exercise
                </Button>
            </div>
        )
    }

    public render() {
        const { status, result, items, currentIndex, current, variants } = this.props
        const content = []

        switch (status) {
            case Statuses.Init:
            case Statuses.Request:
                content.push(<Preloader key="preloader" />)
                break
            case Statuses.Success:
                if (!items.length) {
                    content.push(<EmptyList key="empty" />)
                } else {
                    content.push(
                        result === -1
                            ? this.renderExercise(items, currentIndex, current, variants)
                        : this.renderResult(result),
                    )
                }
                break
            case Statuses.Failure:
                content.push(<Alert key="error" type="danger" message="Failed to load vocabulary items." />)
                break
        }

        return (
            <div>
                <PageTitle title="Phrase-Translation" />
                {content}
            </div>
        )
    }
}

function select(state: IStoreState): IProps {
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

export default connect(select)(PhraseTranslationPage)
