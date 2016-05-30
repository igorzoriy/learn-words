import React, { Component, PropTypes } from 'react'
import { findDOMNode } from 'react-dom'
import { connect } from 'react-redux'
import {
    STATUS_INIT,
    STATUS_REQUEST,
    STATUS_SUCCESS,
    STATUS_FAILURE,
} from '../api/constants'
import { addVocabularyItem } from './actions'
import PageTitle from '../components/PageTitle'
import FormInputText from '../components/FormInputText'
import FormSubmit from '../components/FormSubmit'
import Preloader from '../components/Preloader'
import Alert from '../components/Alert'

export class NewItemPage extends Component {
    static propTypes = {
        status: PropTypes.string.isRequired,
        phrase: PropTypes.string.isRequired,
        translation: PropTypes.string.isRequired,
    }

    handleSubmit = (e) => {
        e.preventDefault()

        const { dispatch } = this.props
        dispatch(addVocabularyItem(findDOMNode(this.refs.phrase).value, findDOMNode(this.refs.translation).value))
    }

    renderPhrase (value, disabled = false) {
        return (
            <FormInputText
                ref="phrase"
                key="phrase"
                placeholder="Phrase"
                required={ true }
                defaultValue={ value }
                disabled={ disabled }
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
                defaultValue={ value }
                disabled={ disabled }
            />
        )
    }

    render () {
        const { status, phrase, translation } = this.props
        const formContent = []

        switch (status) {
            case STATUS_INIT:
                formContent.push(
                    this.renderPhrase(phrase),
                    this.renderTranslation(translation),
                    <FormSubmit title="Add" key="submit" />
                )
                break
            case STATUS_REQUEST:
                formContent.push(
                    this.renderPhrase(phrase, true),
                    this.renderTranslation(translation, true),
                    <FormSubmit title="Add" key="submit" disabled={ true } />,
                    <Preloader key="preloader" />
                )
                break
            case STATUS_FAILURE:
                formContent.push(
                    this.renderPhrase(phrase),
                    this.renderTranslation(translation),
                    <FormSubmit title="Add" key="submit" />,
                    <Alert key="error" type="warning" message="Item not saved. Try again." />
                )
                break
            case STATUS_SUCCESS:
                formContent.push(
                    this.renderPhrase(phrase),
                    this.renderTranslation(translation),
                    <FormSubmit title="Add" key="submit" />,
                    <Alert key="success" type="success" message="Item has beed saved successfully." />
                )
                break
        }

        return (
            <div>
                <PageTitle title="Add new phrase" />
                <form onSubmit={ this.handleSubmit } method="post">
                    { formContent }
                </form>
            </div>
        )
    }
}

function select (state) {
    return {
        status: state.vocabulary.new.status,
        phrase: state.vocabulary.new.phrase,
        translation: state.vocabulary.new.translation,
    }
}

export default connect(select)(NewItemPage)
