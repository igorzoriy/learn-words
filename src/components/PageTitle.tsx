import React from "react"

interface IProps {
    title: string
}

const PageTitle: React.FunctionComponent<IProps> = ({ title }) => {
    return (
        <h1>
            {title}
        </h1>
    )
}

export default PageTitle
