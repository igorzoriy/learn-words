import * as React from "react"
import { connect } from "react-redux"
import { match } from "react-router"
import { ThunkDispatch } from "redux-thunk"
import Alert from "../components/Alert"
import FormSubmit from "../components/FormSubmit"
import PageTitle from "../components/PageTitle"
import Preloader from "../components/Preloader"
import { Statuses } from "../types"
import { Action, addVocabularyItem, clearVocabularyform, updateVocabularyForm } from "./actions"

export interface IProps {
    dispatch: ThunkDispatch<{}, {}, Action>
    match: match<{id: string}>
    status: Statuses
    phrase: string
    translation: string
    errorMessage: string
    successMessage: string
}

enum Fields {
    phrase = "phrase",
    translation = "translation",
}

export class AddItemPage extends React.Component<IProps> {
    private phraseRef: React.RefObject<HTMLInputElement>

    constructor(props: IProps) {
        super(props)
        const { dispatch } = props
        dispatch(clearVocabularyform())
        this.phraseRef = React.createRef()
    }

    public componentDidUpdate(prevProps: IProps) {
        if (prevProps.status === Statuses.Request && this.props.status === Statuses.Success) {
            this.phraseRef.current.focus()
        }
    }

    private handleFormChange = (type: Fields, e: React.ChangeEvent<HTMLInputElement>) => {
        const { dispatch, phrase, translation } = this.props
        if (type === Fields.phrase) {
            dispatch(updateVocabularyForm(e.target.value, translation))
        } else {
            dispatch(updateVocabularyForm(phrase, e.target.value))
        }
    }

    protected handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const { dispatch, phrase, translation } = this.props
        dispatch(addVocabularyItem(phrase, translation))
    }

    protected renderTitle() {
        return (
            <PageTitle title="Add new phrase" />
        )
    }

    private renderPhrase(value: string, disabled = false) {
        return (
            <input
                type="text"
                className="form-control"
                ref={this.phraseRef}
                key="phrase"
                placeholder="Phrase"
                required={true}
                disabled={disabled}
                value={value}
                onChange={this.handleFormChange.bind(this, Fields.phrase)}
            />
        )
    }

    private renderTranslation(value: string, disabled = false) {
        return (
            <input
                type="text"
                className="form-control"
                key="translation"
                placeholder="Translation"
                required={true}
                disabled={disabled}
                value={value}
                onChange={this.handleFormChange.bind(this, Fields.translation)}
            />
        )
    }

    protected renderSubmit() {
        return (
            <FormSubmit
                key="submit"
                title="Add"
            />
        )
    }

    public render() {
        const { status, phrase, translation, errorMessage, successMessage } = this.props
        const formContent = []

        switch (status) {
            case Statuses.Init:
            case Statuses.Failure:
            case Statuses.Success:
                formContent.push(
                    this.renderPhrase(phrase),
                    this.renderTranslation(translation),
                    this.renderSubmit(),
                )
                break

            case Statuses.Request:
                formContent.push(
                    this.renderPhrase(phrase, true),
                    this.renderTranslation(translation, true),
                    <Preloader key="preloader" />,
                )
                break
        }

        return (
            <div>
                {this.renderTitle()}
                <form onSubmit={this.handleFormSubmit} method="post">
                    {formContent}
                </form>
                { errorMessage.length ?
                    <Alert key="error" type="danger" message={errorMessage} /> :
                    "" }
                { successMessage.length ?
                    <Alert key="success" type="success" message={successMessage} /> :
                    "" }
            </div>
        )
    }
}

export function mapStateToProps(state: any) {
    return state.vocabulary.form
}

export default connect(mapStateToProps)(AddItemPage)
