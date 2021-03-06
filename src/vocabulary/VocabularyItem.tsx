import React from "react"
import { Link } from "react-router-dom"
import { ICard } from "../types"

export interface IProps extends ICard {
    handleRemove(id: string): void
}

export const VocabularyItem: React.FunctionComponent<IProps> = ({ id, phrase, translation, handleRemove }) => {
    return (
        <li className="list-group-item">
            <div className="list-item-phrase">
                {phrase}
            </div>
            <div className="list-item-translation">
                {translation}
            </div>
            <div className="list-item-controls">
                <Link to={`/vocabulary/edit/${id}`} className="list-item-control">
                    <svg className="icon-edit">
                        <use xlinkHref="#icon-edit" />
                    </svg>
                </Link>
                <button type="button" className="list-item-control" onClick={handleRemove.bind(null, id)}>
                    <svg className="icon-remove">
                        <use xlinkHref="#icon-remove" />
                    </svg>
                </button>
            </div>
        </li>
    )
}
