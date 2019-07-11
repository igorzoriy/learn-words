import { Location } from "history"
import React, { FunctionComponent } from "react"
import { Redirect, Route, RouteProps } from "react-router"

interface IProps extends RouteProps {
    isLoggedIn: boolean
    location?: Location
}

export const PrivateRoute: FunctionComponent<IProps> = (props) => {
    if (!props.isLoggedIn) {
        return <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
    }
    return <Route {...props} />
}
