import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Component from './Component'

export default class VocabularyItem extends Component {
    static displayName = 'VocabularyItem'
    static propTypes = {
        id: PropTypes.string.isRequired,
        phrase: PropTypes.string.isRequired,
        translation: PropTypes.string.isRequired,
        handleRemove: PropTypes.func.isRequired,
    }

    render () {
        const { id, phrase, translation, handleRemove } = this.props

        return (
            <li className="list-group-item">
                <div className="list-item-phrase">
                    { phrase }
                </div>
                <div className="list-item-translation">
                    { translation }
                </div>
                <div className="list-item-controls">
                    <Link to={ `/vocabulary/edit/${id}` } className="list-item-control">
                        <svg className="icon-edit">
                            <use xlinkHref="#icon-edit" />
                        </svg>
                    </Link>
                    <button type="button" className="list-item-control" onClick={ handleRemove.bind(null, id) }>
                        <svg className="icon-remove">
                            <use xlinkHref="#icon-remove" />
                        </svg>
                    </button>
                </div>
            </li>
        )
    }
}
