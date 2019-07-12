import React, { FunctionComponent } from "react"
import { Button } from "../components/Button"
import { ICard } from "../types"

interface IProps {
    card: ICard
    current: number
    total: number
    variants: ICard[]
    answer: string
    addAnswer: (id: string, variantId: string) => void
    moveToNextQuestion: () => void
    calculateResult: () => void
}

export const Exercise: FunctionComponent<IProps> = ({
    card: { id, phrase },
    current,
    total,
    variants,
    answer,
    addAnswer,
    moveToNextQuestion,
    calculateResult,
}) => {
    const handleAddAnswer = (variantId: string) => {
        addAnswer(id, variantId)
    }

    let btn
    if (current < total) {
        btn = <Button
            modifiers={["btn", "btn-info"]}
            onClick={moveToNextQuestion}
            key="next-btn"
        >
            Next
        </Button>
    } else  {
        btn = <Button
            modifiers={["btn", "btn-info"]}
            onClick={calculateResult}
            key="result-btn"
        >
            Result
        </Button>
    }

    return (
        <div key="exercise">
            <div className="exercise-card">
                {phrase}
            </div>
            {variants.map((variant) => {
                const classNames = ["btn"]
                if (answer && id === answer) {
                    classNames.push(id === variant.id ? "btn-success" : "btn-warning")
                } else if (answer && id !== answer) {
                    classNames.push(id === variant.id ? "btn-success" : "btn-danger")
                } else {
                    classNames.push("btn-warning")
                }
                return (
                    <Button
                        modifiers={classNames}
                        onClick={handleAddAnswer.bind(null, variant.id)}
                        disabled={!!answer}
                        key={variant.id}
                    >
                        {variant.translation}
                    </Button>
                )
            })}
            <div className="exercise-counter">
                {current}&nbsp;/&nbsp;{total}
            </div>
            {btn}
        </div>
    )
}
