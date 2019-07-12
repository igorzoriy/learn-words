import React, { FunctionComponent } from "react"
import { Alert } from "../components/Alert"
import { PageTitle } from "../components/PageTitle"

export const NotFoundPage: FunctionComponent = () => {
    return (
        <div>
            <PageTitle title="Page not found" />
            <Alert key="error" type="danger" message="Invalid route." />
        </div>
    )
}
