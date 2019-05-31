import * as React from "react"
import { connect } from "react-redux"
import { match } from "react-router"
import { Dispatch } from "redux"
import Alert from "../components/Alert"
import PageTitle from "../components/PageTitle"
import { ICard, IStoreState, Statuses } from "../types"
import {
    editVocabularyItem,
    fillVocabularyForm,
    updateVocabularyEditForm,
} from "./actions"
import { EditForm } from "./EditForm"

export interface IProps {
    fillVocabularyForm: (id: string) => void
    updateVocabularyEditForm: (phrase: string, translation: string) => void
    editVocabularyItem: (card: ICard) => void,
    match: match<{ id: string }>
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

export class EditItemPage extends React.PureComponent<IProps> {
    private phraseRef: React.RefObject<HTMLInputElement>

    constructor(props: IProps) {
        super(props)
        this.phraseRef = React.createRef()
    }

    public componentDidMount() {
        this.props.fillVocabularyForm(this.props.match.params.id)
    }

    public componentDidUpdate(prevProps: IProps) {
        if (prevProps.status === Statuses.Request && this.props.status === Statuses.Success) {
            this.phraseRef.current.focus()
        }
    }

    private handleFormChange = (type: Fields, e: React.ChangeEvent<HTMLInputElement>) => {
        const { phrase, translation } = this.props
        if (type === Fields.phrase) {
            this.props.updateVocabularyEditForm(e.target.value, translation)
        } else {
            this.props.updateVocabularyEditForm(phrase, e.target.value)
        }
    }

    private handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        const { phrase, translation, match: { params: { id } } } = this.props
        this.props.editVocabularyItem({
            id,
            phrase,
            translation,
        })
    }

    public render() {
        const { status, phrase, translation, errorMessage, successMessage } = this.props

        return (
            <div>
                <PageTitle title="Edit phrase" />
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

const mapStateToProps = ({ vocabulary: { edit } }: IStoreState) => ({...edit})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    fillVocabularyForm: (id: string) => dispatch(fillVocabularyForm(id)),
    updateVocabularyEditForm: (phrase: string, translation: string) =>
        dispatch(updateVocabularyEditForm(phrase, translation)),
    editVocabularyItem: (card: ICard) => dispatch(editVocabularyItem(card)),
})

export const EditItemPageContainer = connect(mapStateToProps, mapDispatchToProps)(EditItemPage)
