import React, { FunctionComponent, useEffect, useRef } from "react"
import { connect } from "react-redux"
import { match } from "react-router"
import { Dispatch } from "redux"
import { Alert } from "../components/Alert"
import { PageTitle } from "../components/PageTitle"
import { ICard, IStoreState, Statuses } from "../types"
import {
    editVocabularyItem,
    fillVocabularyForm,
    updateVocabularyEditForm,
} from "./actions"
import { EditForm } from "./EditForm"

export interface IProps {
    fillForm: (id: string) => void
    updateForm: (phrase: string, translation: string) => void
    editItem: (card: ICard) => void
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

export const EditItemPage: FunctionComponent<IProps> = ({
    status,
    phrase,
    translation,
    errorMessage,
    successMessage,
    match: { params: { id } },
    fillForm,
    updateForm,
    editItem,
}) => {
    const phraseRef = useRef(null)
    useEffect(() => {
        fillForm(id)
        phraseRef.current.focus()
    }, [])
    useEffect(() => {
        if (status === Statuses.Success) {
            phraseRef.current.focus()
        }
    }, [status])

    const handleFormChange = (type: Fields, e: React.ChangeEvent<HTMLInputElement>) => {
        if (type === Fields.phrase) {
            updateForm(e.target.value, translation)
        } else {
            updateForm(phrase, e.target.value)
        }
    }
    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        editItem({
            id,
            phrase,
            translation,
        })
    }

    return (
        <div>
            <PageTitle title="Edit phrase" />
            <EditForm
                phraseRef={phraseRef}
                onPhraseChange={handleFormChange.bind(this, Fields.phrase)}
                onTranslationChange={handleFormChange.bind(this, Fields.translation)}
                onSubmit={handleFormSubmit}
                inProgress={status === Statuses.Request}
                phrase={phrase}
                translation={translation}
            />
            {errorMessage.length > 0 && <Alert key="error" type="danger" message={errorMessage} />}
            {successMessage.length > 0 && <Alert key="success" type="success" message={successMessage} />}
        </div>
    )
}

const mapStateToProps = ({ vocabulary: { edit } }: IStoreState) => ({...edit})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    fillForm: (id: string) => dispatch(fillVocabularyForm(id)),
    updateForm: (phrase: string, translation: string) => dispatch(updateVocabularyEditForm(phrase, translation)),
    editItem: (card: ICard) => dispatch(editVocabularyItem(card)),
})

export const EditItemPageContainer = connect(mapStateToProps, mapDispatchToProps)(EditItemPage)
