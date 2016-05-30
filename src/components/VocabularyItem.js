import React, { PropTypes } from 'react'
import Component from './Component'

export default class VocabularyItem extends Component {
    static propTypes = {
        phrase: PropTypes.string.isRequired,
        translation: PropTypes.string.isRequired,
        handleEdit: PropTypes.func.isRequired,
        handleRemove: PropTypes.func.isRequired,
    }

    render () {
        const { id, phrase, translation, handleEdit, handleRemove } = this.props

        return (
            <li className="list-group-item">
                <div className="list-item-phrase">
                    { phrase }
                </div>
                <div className="list-item-translation">
                    { translation }
                </div>
                <div>
                    <button type="button" className="list-item-control" onClick={ handleEdit.bind(null, id) }>
                        <svg className="icon-edit">
                            <use xlinkHref="#icon-edit" />
                        </svg>
                    </button>
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
