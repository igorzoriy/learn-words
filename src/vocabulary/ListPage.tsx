import * as React from "react"
import { connect } from "react-redux"
import { ThunkDispatch } from "redux-thunk"
import Alert from "../components/Alert"
import PageTitle from "../components/PageTitle"
import Preloader from "../components/Preloader"
import { ICard, Statuses } from "../types"
import { Action, getVocabularyItems, removeVocabularyItem } from "./actions"
import VocabularyList from "./VocabularyList"

interface IProps {
    dispatch: ThunkDispatch<{}, {}, Action>
    status: Statuses
    items: ICard[]
}

export class ListPage extends React.PureComponent<IProps> {
    constructor(props: IProps) {
        super(props)

        const { dispatch } = props
        dispatch(getVocabularyItems())
    }

    public handleRemove = (id: string) => {
        const { dispatch } = this.props
        dispatch(removeVocabularyItem(id))
    }

    public renderList(items: ICard[]) {
        return (
            <VocabularyList
                items={items}
                handleRemove={this.handleRemove}
                key="list"
            />
        )
    }

    public render() {
        const { items, status } = this.props
        const content = []

        switch (status) {
            case Statuses.Init:
            case Statuses.Request:
                content.push(<Preloader key="preloader" />)
                break
            case Statuses.Success:
                content.push(this.renderList(items))
                break
            case Statuses.Failure:
                content.push(<Alert key="error" type="danger" message="Failed to load vocabulary list." />)
                break
        }

        return (
            <div>
                <PageTitle title="Vocabulary list" />
                {content}
            </div>
        )
    }
}

function mapStateToProps(state: any) {
    const { status, ids, hash } = state.vocabulary.entities
    const items = ids.map((id: string) => ({id, ...hash[id]}))
    return {
        status,
        items,
    }
}

export default connect(mapStateToProps)(ListPage)
