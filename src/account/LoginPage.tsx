import { Location } from "history"
import * as React from "react"
import { connect } from "react-redux"
import { Redirect } from "react-router"
import { Dispatch } from "redux"
import Alert from "../components/Alert"
import Button from "../components/Button"
import PageTitle from "../components/PageTitle"
import { login } from "./actions"

export interface IProps {
    dispatch: Dispatch
    location: Location
    isAnonymous: boolean
    error: string
}

export class LoginPage extends React.Component<IProps> {
    public handleLoginClick = (e: React.MouseEvent) => {
        e.preventDefault()
        this.props.dispatch(login())
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

function mapStateToProps(state: any) {
    return {
        isAnonymous: state.account.isAnonymous,
        error: state.account.error,
    }
}

export default connect(mapStateToProps)(LoginPage)
