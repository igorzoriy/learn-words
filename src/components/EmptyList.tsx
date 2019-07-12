import React, { FunctionComponent } from "react"
import { Alert } from "./Alert"

export const EmptyList: FunctionComponent = () =>
    <Alert message="Your list of phrases is empty." />
