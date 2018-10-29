import * as React from "react"
import { connect } from "react-redux"
import FormSubmit from "../components/FormSubmit"
import PageTitle from "../components/PageTitle"
import { editVocabularyItem, fillVocabularyForm } from "./actions"
import { AddItemPage, IProps, mapStateToProps } from "./AddItemPage"

export class EditItemPage extends AddItemPage {
    constructor(props: IProps) {
        super(props)
        const { dispatch, match: { params: { id } } } = props
        dispatch(fillVocabularyForm(id))
    }

    protected renderTitle() {
        return (
            <PageTitle title="Edit phrase" />
        )
    }

    protected handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const { dispatch, phrase, translation, match: { params: { id } } } = this.props
        dispatch(editVocabularyItem({
            id,
            phrase,
            translation,
        }))
    }

    protected renderSubmit() {
        return (
            <FormSubmit
                key="submit"
                title="Edit"
            />
        )
    }
}

export default connect(mapStateToProps)(EditItemPage)
