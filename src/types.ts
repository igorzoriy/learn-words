export enum Statuses {
    Init = "statuses/init",
    Request = "statuses/request",
    Success = "statuses/success",
    Failure = "statuses/failure",
}

export interface IAction {
    type: string,
    params?: {},
}

export interface IFailureAction extends IAction {
    params: {
        message: string,
    },
}

export interface ICard {
    id: string,
    phrase: string,
    translation: string,
}

export interface ICardList {
    [id: string]: ICard,
}

export interface IExerciseItem {
    id: string,
    variants: string[],
    answer: string,
}

export interface IAccountState {
    isLoading: boolean,
    isAnonymous: boolean,
    uid: string,
    error: string,
}

export interface IVocabularyEntitiesState {
    status: Statuses,
    ids: string[],
    hash: {
        [id: string]: ICard,
    },
}

export interface IVocabularyFormState {
    status: Statuses,
    phrase: string,
    translation: string,
    errorMessage: string,
    successMessage: string,
}

export interface IFlashcardsState {
    ids: string[],
    currentIndex: number,
    showFront: boolean,
}

export interface IExercisesState {
    result: number,
    items: IExerciseItem[],
    currentIndex: number,
}

export interface IStoreState {
    account: IAccountState,
    vocabulary: {
        entities: IVocabularyEntitiesState,
        form: IVocabularyFormState,
    },
    flashcards: IFlashcardsState,
    exercises: IExercisesState,
}

export const initialStoreState: IStoreState = {
    account: {
        isLoading: true,
        isAnonymous: true,
        uid: "",
        error: "",
    },
    vocabulary: {
        entities: {
            status: Statuses.Init,
            ids: [],
            hash: {},
        },
        form: {
            status: Statuses.Init,
            phrase: "",
            translation: "",
            errorMessage: "",
            successMessage: "",
        },
    },
    flashcards: {
        ids: [],
        currentIndex: -1,
        showFront: true,
    },
    exercises: {
        result: -1,
        items: [],
        currentIndex: -1,
    },
}
