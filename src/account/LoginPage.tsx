import { Location } from "history"
import * as React from "react"
import { connect } from "react-redux"
import { Redirect } from "react-router"
import { Dispatch } from "redux"
import Alert from "../components/Alert"
import Button from "../components/Button"
import PageTitle from "../components/PageTitle"
import { IStoreState } from "../types"
import { login } from "./actions"

export interface IProps {
    dispatch: Dispatch
    location: Location
    login: () => void
    isAnonymous: boolean
    error: string
}

export class LoginPage extends React.PureComponent<IProps> {
    public handleLoginClick = (e: React.MouseEvent) => {
        e.preventDefault()
        this.props.login()
    }

    public render() {
        const { isAnonymous, error } = this.props

        if (!isAnonymous) {
            return <Redirect to={{ pathname: "/vocabulary/list", state: { from: this.props.location } }} />
        }

        return (
            <div>
                <PageTitle title="Login" />
                <Button modifiers={["btn-primary", "btn-lg"]} onClick={this.handleLoginClick}>
                    Using Facebook
                </Button>
                {error.length ? <Alert key="error" type="danger" message={error} /> : ""}
            </div>
        )
    }
}

const mapStateToProps = (state: IStoreState) => ({
    isAnonymous: state.account.isAnonymous,
    error: state.account.error,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    login: () => dispatch(login()),
})

export const LoginPageContainer = connect(mapStateToProps, mapDispatchToProps)(LoginPage)
