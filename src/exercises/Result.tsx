import React, { FunctionComponent } from "react"
import { Button } from "../components/Button"

export const Result: FunctionComponent<{ result: number, onClick: () => void }> = ({ result, onClick }) => (
    <div key="result">
        <div className="exercise-card">
            Your result is {result} %
        </div>
        <Button
            modifiers={["btn", "btn-info"]}
            onClick={onClick}
            key="start-btn"
        >
            Start New Exercise
        </Button>
    </div>
)
