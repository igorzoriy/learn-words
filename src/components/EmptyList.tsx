import React from "react"
import { Alert } from "./Alert"

const EmptyList: React.FunctionComponent = () => {
    return <Alert type="info" message="Your list of phrases is empty." />
}

export default EmptyList
