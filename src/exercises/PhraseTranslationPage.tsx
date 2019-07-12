import React, { FunctionComponent, useEffect } from "react"
import { Alert } from "../components/Alert"
import { EmptyList } from "../components/EmptyList"
import { PageTitle } from "../components/PageTitle"
import { Preloader } from "../components/Preloader"
import { ICard, IExerciseItem, Statuses } from "../types"
import { Exercise } from "./Exercise"
import { Result } from "./Result"

export interface IProps {
    init: () => void
    addAnswer: (id: string, variantId: string) => void
    moveToNextQuestion: () => void
    calculateResult: () => void
    status: Statuses
    result: number
    items: IExerciseItem[]
    currentIndex: number
    current: ICard
    variants: ICard[]
}

export const PhraseTranslationPage: FunctionComponent<IProps> = ({
    status,
    result,
    items,
    currentIndex,
    current,
    variants,
    init,
    addAnswer,
    moveToNextQuestion,
    calculateResult,
}) => {
    useEffect(() => {
        init()
    }, [])

    let content: React.ReactElement = null
    if (status === Statuses.Success) {
        if (items.length === 0) {
            content = <EmptyList key="empty" />
        } else if (result === -1) {
            const { answer } = items[currentIndex]

            content = <Exercise
                card={current}
                current={currentIndex + 1}
                total={items.length}
                variants={variants}
                answer={answer}
                addAnswer={addAnswer}
                moveToNextQuestion={moveToNextQuestion}
                calculateResult={calculateResult}
            />
        } else if (result !== -1) {
            content = <Result result={result} onClick={init} />
        }
    }

    return (
        <div>
            <PageTitle title="Phrase-Translation" />
            {status === Statuses.Init && <Preloader key="preloader" />}
            {status === Statuses.Request && <Preloader key="preloader" />}
            {status === Statuses.Failure &&
                <Alert key="error" type="danger" message="Failed to load vocabulary items." />}
            {content}
        </div>
    )
}
