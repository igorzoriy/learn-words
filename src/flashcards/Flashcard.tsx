import classnames from "classnames"
import { DIRECTION_LEFT, DIRECTION_RIGHT } from "hammerjs"
import * as React from "react"
import * as Hammer from "react-hammerjs"
import { Link } from "react-router-dom"
import { ICard } from "../types"

interface IProps extends ICard {
    showFront: boolean
    handleTap: () => void
    handleSwipeLeft: () => void
    handleSwipeRight: () => void
}

export default class Flashcard extends React.PureComponent<IProps> {
    public handleSwipe = (e: HammerInput) => {
        const { handleSwipeLeft, handleSwipeRight } = this.props
        if (e.direction === DIRECTION_LEFT) {
            handleSwipeLeft()
        } else if (e.direction === DIRECTION_RIGHT) {
            handleSwipeRight()
        }
    }

    public renderControls() {
        const { id } = this.props

        return (
            <div className="card-controls">
                <Link to={`/vocabulary/edit/${id}`} className="card-controls-edit">
                    <svg className="icon-edit">
                        <use xlinkHref="#icon-edit" />
                    </svg>
                </Link>
            </div>
        )
    }

    public rendeNotice() {
        return (
            <div className="card-notice">
                <span>swipe left</span>
                <span>tap to flip</span>
                <span>swipe right</span>
            </div>
        )
    }

    public render() {
        const { phrase, translation, showFront, handleTap } = this.props
        const flipperClassName = classnames("card-flipper", {
            flipped: !showFront,
        })

        return (
            <Hammer onTap={handleTap} onSwipe={this.handleSwipe}>
                <div className="card">
                    <div className={flipperClassName}>
                        <div className="card-front">
                            {this.renderControls()}
                            <div className="card-title">
                                {phrase}
                            </div>
                            {this.rendeNotice()}
                        </div>
                        <div className="card-back">
                            {this.renderControls()}
                            <div className="card-title">
                                {translation}
                            </div>
                            {this.rendeNotice()}
                        </div>
                    </div>
                </div>
            </Hammer>
        )
    }
}
