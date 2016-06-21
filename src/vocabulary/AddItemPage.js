import React, { Component, PropTypes } from 'react'
import { findDOMNode } from 'react-dom'
import { connect } from 'react-redux'
import {
    STATUS_INIT,
    STATUS_REQUEST,
    STATUS_SUCCESS,
    STATUS_FAILURE,
} from '../api/constants'
import { clearVocabularyform, addVocabularyItem, updateVocabularyForm } from './actions'
import PageTitle from '../components/PageTitle'
import FormInputText from '../components/FormInputText'
import FormSubmit from '../components/FormSubmit'
import Preloader from '../components/Preloader'
import Alert from '../components/Alert'

export class AddItemPage extends Component {
    static propTypes = {
        status: PropTypes.string.isRequired,
        phrase: PropTypes.string.isRequired,
        translation: PropTypes.string.isRequired,
    }

    constructor (props) {
        super(props)
        const { dispatch } = props
        dispatch(clearVocabularyform())
    }

    renderTitle () {
        return (
            <PageTitle title="Add new phrase" />
        )
    }

    handleFormChange = () => {
        const { dispatch } = this.props
        const phrase = findDOMNode(this.refs.phrase).value
        const translation = findDOMNode(this.refs.translation).value
        dispatch(updateVocabularyForm(phrase, translation))
    }

    renderPhrase (value, disabled = false) {
        return (
            <FormInputText
                ref="phrase"
                key="phrase"
                placeholder="Phrase"
                required={ true }
                disabled={ disabled }
                value={ value }
                onChange={ this.handleFormChange }
            />
        )
    }

    renderTranslation (value, disabled = false) {
        return (
            <FormInputText
                ref="translation"
                key="translation"
                placeholder="Translation"
                required={ true }
                disabled={ disabled }
                value={ value }
                onChange={ this.handleFormChange }
            />
        )
    }

    handleFormSubmit = (e) => {
        e.preventDefault()
        const { dispatch, phrase, translation } = this.props
        dispatch(addVocabularyItem(phrase, translation))
    }

    renderSubmit () {
        return (
            <FormSubmit
                key="submit"
                title="Add"
            />
        )
    }

    render () {
        const { status, phrase, translation, errorMessage, successMessage } = this.props
        const formContent = []

        switch (status) {
            case STATUS_INIT:
                formContent.push(
                    this.renderPhrase(phrase),
                    this.renderTranslation(translation),
                    this.renderSubmit()
                )
                break

            case STATUS_REQUEST:
                formContent.push(
                    this.renderPhrase(phrase, true),
                    this.renderTranslation(translation, true),
                    <Preloader key="preloader" />
                )
                break

            case STATUS_FAILURE:
                formContent.push(
                    this.renderPhrase(phrase),
                    this.renderTranslation(translation),
                    this.renderSubmit()
                )
                break

            case STATUS_SUCCESS:
                formContent.push(
                    this.renderPhrase(phrase),
                    this.renderTranslation(translation),
                    this.renderSubmit()
                )
                break
        }

        return (
            <div>
                { this.renderTitle() }
                <form onSubmit={ this.handleFormSubmit } method="post">
                    { formContent }
                </form>
                { errorMessage.length ?
                    <Alert key="error" type="danger" message={ errorMessage } /> :
                    '' }
                { successMessage.length ?
                    <Alert key="success" type="success" message={ successMessage } /> :
                    '' }
            </div>
        )
    }
}

export function mapStateToProps (state) {
    return state.vocabulary.form
}

export default connect(mapStateToProps)(AddItemPage)
