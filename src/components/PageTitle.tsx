import React, { FunctionComponent } from "react"

interface IProps {
    title: string
}

export const PageTitle: FunctionComponent<IProps> = ({ title }) => (
    <h1>
        {title}
    </h1>
)
