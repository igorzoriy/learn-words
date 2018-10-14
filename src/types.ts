export enum Statuses {
    Init = "statuses/init",
    Request = "statuses/request",
    Success = "statuses/success",
    Failure = "statuses/failure",
}

export interface IAction<Params = {}, Payload = {}> {
    type: string
    status?: Statuses
    params?: Params
    payload?: Payload
}

export interface ICard {
    id: string
    phrase: string
    translation: string
}
