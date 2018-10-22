import classnames from "classnames"
import * as React from "react"
import { Link } from "react-router-dom"
import * as Swipable from "react-swipeable"
import { ICard } from "../types"

interface IProps extends ICard {
    showFront: boolean
    handleTap: () => void
    handleSwipeLeft: () => void
    handleSwipeRight: () => void
}

export default class Flashcard extends React.PureComponent<IProps> {
    private handleTap = (e: React.TouchEvent) => {
        e.preventDefault()
        this.props.handleTap()
    }

    private renderControls() {
        return (
            <div className="card-controls">
                <Link to={`/vocabulary/edit/${this.props.id}`} className="card-controls-edit">
                    <svg className="icon-edit">
                        <use xlinkHref="#icon-edit" />
                    </svg>
                </Link>
            </div>
        )
    }

    private rendeNotice() {
        return (
            <div className="card-notice">
                <span>swipe left</span>
                <span>tap to flip</span>
                <span>swipe right</span>
            </div>
        )
    }

    public render() {
        const { phrase, translation, showFront, handleSwipeLeft, handleSwipeRight } = this.props
        const flipperClassName = classnames("card-flipper", {
            flipped: !showFront,
        })

        return (
            <Swipable
                trackMouse={true}
                onTap={this.handleTap}
                onSwipedLeft={handleSwipeLeft}
                onSwipedRight={handleSwipeRight}
            >
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
            </Swipable>
        )
    }
}
