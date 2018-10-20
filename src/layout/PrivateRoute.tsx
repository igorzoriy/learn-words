import { Location } from "history"
import * as React from "react"
import { Redirect, Route, RouteProps } from "react-router"

interface IProps extends RouteProps {
    isLoggedIn: boolean
    location?: Location
}

const PrivateRoute: React.StatelessComponent<IProps> = (props) => {
    if (!props.isLoggedIn) {
        return <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
    }
    return <Route {...props} />
}

export default PrivateRoute
