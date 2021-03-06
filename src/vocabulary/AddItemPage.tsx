import React, { FormEvent, FunctionComponent, useEffect, useRef } from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { Alert } from "../components/Alert"
import { PageTitle } from "../components/PageTitle"
import { IStoreState, Statuses } from "../types"
import {
    addVocabularyItem,
    updateVocabularyAddForm,
} from "./actions"
import { EditForm } from "./EditForm"

interface IProps {
    addItem: (phrase: string, translation: string) => void
    updateForm: (phrase: string, translation: string) => void,
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

export const AddItemPage: FunctionComponent<IProps> = ({
    status,
    errorMessage,
    successMessage,
    phrase,
    translation,
    addItem,
    updateForm,
}) => {
    const phraseRef = useRef(null)

    useEffect(() => {
        phraseRef.current.focus()
    }, [])

    useEffect(() => {
        if (status === Statuses.Success) {
            phraseRef.current.focus()
        }
    }, [status])

    const handleFormChange = (type: Fields, e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        updateForm(
            type === Fields.phrase ? value : phrase,
            type === Fields.phrase ? translation : value,
        )
    }

    const handleFormSubmit = (e: FormEvent) => {
        e.preventDefault()
        addItem(phrase, translation)
    }

    return (
        <div>
            <PageTitle title="Add new phrase" />
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

const mapStateToProps = ({ vocabulary: { add } }: IStoreState) => ({...add})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    updateForm: (phrase: string, translation: string) => dispatch(updateVocabularyAddForm(phrase, translation)),
    addItem: (phrase: string, translation: string) => dispatch(addVocabularyItem(phrase, translation)),
})

export const AddItemPageContainer = connect(mapStateToProps, mapDispatchToProps)(AddItemPage)
