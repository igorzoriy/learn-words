import React from 'react'
import PropTypes from 'prop-types'
import Component from './Component'
import Hammer from 'react-hammerjs'
import { DIRECTION_LEFT, DIRECTION_RIGHT } from 'hammerjs'
import { Link } from 'react-router-dom'
import classnames from 'classnames'

export default class Flashcard extends Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        phrase: PropTypes.string.isRequired,
        translation: PropTypes.string.isRequired,
        showFront: PropTypes.bool.isRequired,
        handleTap: PropTypes.func.isRequired,
        handleSwipeLeft: PropTypes.func.isRequired,
        handleSwipeRight: PropTypes.func.isRequired,
    }

    handleSwipe = (e) => {
        const { handleSwipeLeft, handleSwipeRight } = this.props
        if (e.direction === DIRECTION_LEFT) {
            handleSwipeLeft()
        } else if (e.direction === DIRECTION_RIGHT) {
            handleSwipeRight()
        }
    }

    renderControls () {
        const { id } = this.props

        return (
            <div className="card-controls">
                <Link to={ `/vocabulary/edit/${id}` } className="card-controls-edit">
                    <svg className="icon-edit">
                        <use xlinkHref="#icon-edit" />
                    </svg>
                </Link>
            </div>
        )
    }

    rendeNotice () {
        return (
            <div className="card-notice">
                <span>swipe left</span>
                <span>tap to flip</span>
                <span>swipe right</span>
            </div>
        )
    }

    render () {
        const { phrase, translation, showFront, handleTap } = this.props
        const flipperClassName = classnames('card-flipper', {
            'flipped': !showFront,
        })

        return (
            <Hammer onTap={ handleTap } onSwipe={ this.handleSwipe }>
                <div className="card">
                    <div className={ flipperClassName }>
                        <div className="card-front">
                            { this.renderControls() }
                            <div className="card-title">
                                { phrase }
                            </div>
                            { this.rendeNotice() }
                        </div>
                        <div className="card-back">
                            { this.renderControls() }
                            <div className="card-title">
                                { translation }
                            </div>
                            { this.rendeNotice() }
                        </div>
                    </div>
                </div>
            </Hammer>
        )
    }
}
