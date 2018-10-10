export enum Statuses {
    Init = "INIT",
    Request = "REQUEST",
    Success = "SUCCESS",
    Failure = "FAILURE",
}

export interface IAction<Payload> {
    type: string
    status?: Statuses
    payload?: Payload
}

export interface IUser {
    uid: string
}
