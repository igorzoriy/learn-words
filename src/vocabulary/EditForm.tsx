import React from "react"
import FormSubmit from "../components/FormSubmit"
import Preloader from "../components/Preloader"

export interface IProps {
    phraseRef: React.RefObject<HTMLInputElement>
    onSubmit: (e: React.FormEvent) => void
    onPhraseChange: (e: React.FormEvent) => void
    onTranslationChange: (e: React.FormEvent) => void
    inProgress: boolean
    phrase: string
    translation: string
}

export const EditForm: React.FunctionComponent<IProps> = ({
    phraseRef,
    onPhraseChange,
    onTranslationChange,
    onSubmit,
    inProgress,
    phrase,
    translation,
}) => (
    <form onSubmit={onSubmit} method="post">
        <input
            type="text"
            className="form-control"
            ref={phraseRef}
            key="phrase"
            placeholder="Phrase"
            required={true}
            disabled={inProgress}
            value={phrase}
            onChange={onPhraseChange}
        />
        <input
            type="text"
            className="form-control"
            key="translation"
            placeholder="Translation"
            required={true}
            disabled={inProgress}
            value={translation}
            onChange={onTranslationChange}
        />
        {inProgress ? <Preloader key="preloader" /> : <FormSubmit key="submit" title="Add" />}
    </form>
)
