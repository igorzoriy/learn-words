import * as React from "react"
import Alert from "../components/Alert"
import PageTitle from "../components/PageTitle"

const NotFoundPage: React.StatelessComponent = () => {
    return (
        <div>
            <PageTitle title="Page not found" />
            <Alert key="error" type="danger" message="Invalid route." />
        </div>
    )
}

export default NotFoundPage
