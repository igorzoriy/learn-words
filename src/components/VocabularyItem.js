import React, { PropTypes } from 'react'
import Component from './Component'

export default class VocabularyItem extends Component {
    static propTypes = {
        phrase: PropTypes.string.isRequired,
        translation: PropTypes.string.isRequired,
    }

    render () {
        const { phrase, translation } = this.props

        return (
            <li className="list-group-item">
                <div className="list-item-phrase">
                    { phrase }
                </div>
                <div className="list-item-translation">
                    { translation }
                </div>
                <div>
                    <a href="#" className="list-item-control">
                        <svg className="icon-edit">
                            <use xlinkHref="#icon-edit" />
                        </svg>
                    </a>
                    <a href="#" className="list-item-control">
                        <svg className="icon-remove">
                            <use xlinkHref="#icon-remove" />
                        </svg>
                    </a>
                </div>
            </li>
        )
    }
}
