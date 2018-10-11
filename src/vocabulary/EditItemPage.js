import React from 'react'
import { AddItemPage, mapStateToProps } from './AddItemPage'
import { connect } from 'react-redux'
import { fillVocabularyForm, editVocabularyItem } from './actions'
import PageTitle from '../components/PageTitle'
import FormSubmit from '../components/FormSubmit'

export class EditItemPage extends AddItemPage {
    constructor (props) {
        super(props)
        const { dispatch, match: { params: { id } } } = props
        dispatch(fillVocabularyForm(id))
    }

    renderTitle () {
        return (
            <PageTitle title="Edit phrase" />
        )
    }

    handleFormSubmit = (e) => {
        e.preventDefault()
        const { dispatch, phrase, translation, match: { params: { id } } } = this.props
        dispatch(editVocabularyItem(id, phrase, translation))
    }

    renderSubmit () {
        return (
            <FormSubmit
                key="submit"
                title="Edit"
            />
        )
    }
}

export default connect(mapStateToProps)(EditItemPage)
