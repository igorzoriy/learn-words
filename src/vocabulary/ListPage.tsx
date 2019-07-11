import React, { FunctionComponent, useEffect } from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { Alert } from "../components/Alert"
import PageTitle from "../components/PageTitle"
import Preloader from "../components/Preloader"
import { ICard, IStoreState, Statuses } from "../types"
import { getVocabularyItems, removeVocabularyItem } from "./actions"
import VocabularyList from "./VocabularyList"

interface IProps {
    dispatch: Dispatch
    status: Statuses
    items: ICard[]
    getItems: () => void
    removeItem: (id: string) => void
}

export const ListPage: FunctionComponent<IProps> = ({ items, status, getItems, removeItem }) => {
    useEffect(() => {
        getItems()
    }, [])

    const handleRemove = (id: string) => removeItem(id)

    return (
        <div>
            <PageTitle title="Vocabulary list" />
            {status === Statuses.Init && <Preloader key="preloader" />}
            {status === Statuses.Request && <Preloader key="preloader" />}
            {status === Statuses.Failure && <Alert
                key="error"
                type="danger"
                message="Failed to load vocabulary list."
            />}
            {status === Statuses.Success && <VocabularyList
                key="list"
                items={items}
                handleRemove={handleRemove}
            />}
        </div>
    )
}

const mapStateToProps = (state: IStoreState) => {
    const { status, ids, hash } = state.vocabulary.entities
    const items = ids.map((id: string) => ({id, ...hash[id]}))
    return {
        status,
        items,
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
    getItems: () => dispatch(getVocabularyItems()),
    removeItem: (id: string) => dispatch(removeVocabularyItem(id)),
})

export const ListPageContainer = connect(mapStateToProps, mapDispatchToProps)(ListPage)
