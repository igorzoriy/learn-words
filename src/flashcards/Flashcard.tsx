import classnames from "classnames"
import React, { FunctionComponent, TouchEvent } from "react"
import { Link } from "react-router-dom"
import Swipable from "react-swipeable"
import { ICard } from "../types"

interface IProps extends ICard {
    id: string
    phrase: string
    translation: string
    showFront: boolean
    onTap: () => void
    onSwipeLeft: () => void
    onSwipeRight: () => void
}

const Notice: FunctionComponent = () => (
    <div className="card-notice">
        <span>swipe left</span>
        <span>tap to flip</span>
        <span>swipe right</span>
    </div>
)

const Controls: FunctionComponent<{ id: string }> = ({ id }) => (
    <div className="card-controls">
        <Link to={`/vocabulary/edit/${id}`} className="card-controls-edit">
            <svg className="icon-edit">
                <use xlinkHref="#icon-edit" />
            </svg>
        </Link>
    </div>
)

export const Flashcard: FunctionComponent<IProps> = ({
    id,
    phrase,
    translation,
    showFront,
    onTap,
    onSwipeLeft,
    onSwipeRight,
}) => {
    const flipperClassName = classnames("card-flipper", {
        flipped: !showFront,
    })

    const handleTap = (e: TouchEvent) => {
        e.preventDefault()
        onTap()
    }

    return (
        <Swipable
            trackMouse={true}
            onTap={handleTap}
            onSwipedLeft={onSwipeLeft}
            onSwipedRight={onSwipeRight}
        >
            <div className="card">
                <div className={flipperClassName}>
                    <div className="card-front">
                        <Controls id={id} />
                        <div className="card-title">
                            {phrase}
                        </div>
                        <Notice />
                    </div>
                    <div className="card-back">
                        <Controls id={id} />
                        <div className="card-title">
                            {translation}
                        </div>
                        <Notice />
                    </div>
                </div>
            </div>
        </Swipable>
    )
}
