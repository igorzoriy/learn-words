import * as React from "react"
import EmptyList from "../components/EmptyList"
import { IItem } from "./types"
import VocabularyItem from "./VocabularyItem"

export interface IProps {
    items: IItem[]
    handleRemove(id: string): void
}

const VocabularyList: React.StatelessComponent<IProps> = ({ items, handleRemove }) => {
    if (items.length === 0) {
        return <EmptyList />
    }

    return (
        <ul className="list-group">
            {items.map((item) => {
                return (
                    <VocabularyItem
                        {...item}
                        handleRemove={handleRemove}
                        key={item.id}
                    />
                )
            })}
        </ul>
    )
}

export default VocabularyList
