import React from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { Alert } from "../components/Alert"
import PageTitle from "../components/PageTitle"
import { IStoreState, Statuses } from "../types"
import {
    addVocabularyItem,
    updateVocabularyAddForm,
} from "./actions"
import { EditForm } from "./EditForm"

interface IProps {
    addVocabularyItem: (phrase: string, translation: string) => void
    updateVocabularyAddForm: (phrase: string, translation: string) => void,
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

export class AddItemPage extends React.PureComponent<IProps> {
    private phraseRef: React.RefObject<HTMLInputElement>

    constructor(props: IProps) {
        super(props)
        this.phraseRef = React.createRef()
    }

    public componentDidUpdate(prevProps: IProps) {
        if (prevProps.status === Statuses.Request && this.props.status === Statuses.Success) {
            this.phraseRef.current.focus()
        }
    }

    private handleFormChange = (type: Fields, e: React.ChangeEvent<HTMLInputElement>) => {
        const { phrase, translation } = this.props
        const { value } = e.target
        this.props.updateVocabularyAddForm(
            type === Fields.phrase ? value : phrase,
            type === Fields.phrase ? translation : value,
        )
    }

    private handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const { phrase, translation } = this.props
        this.props.addVocabularyItem(phrase, translation)
    }

    public render() {
        const { status, errorMessage, successMessage, phrase, translation } = this.props

        return (
            <div>
                <PageTitle title="Add new phrase" />
                <EditForm
                    phraseRef={this.phraseRef}
                    onPhraseChange={this.handleFormChange.bind(this, Fields.phrase)}
                    onTranslationChange={this.handleFormChange.bind(this, Fields.translation)}
                    onSubmit={this.handleFormSubmit}
                    inProgress={status === Statuses.Request}
                    phrase={phrase}
                    translation={translation}
                />
                {errorMessage.length > 0 && <Alert key="error" type="danger" message={errorMessage} />}
                {successMessage.length > 0 && <Alert key="success" type="success" message={successMessage} />}
            </div>
        )
    }
}

const mapStateToProps = ({ vocabulary: { add } }: IStoreState) => ({...add})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    updateVocabularyAddForm: (phrase: string, translation: string) =>
        dispatch(updateVocabularyAddForm(phrase, translation)),
    addVocabularyItem: (phrase: string, translation: string) => dispatch(addVocabularyItem(phrase, translation)),
})

export const AddItemPageContainer = connect(mapStateToProps, mapDispatchToProps)(AddItemPage)
