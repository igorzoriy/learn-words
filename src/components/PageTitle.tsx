import * as React from "react"

interface IProps {
    title: string
}

const PageTitle: React.StatelessComponent<IProps> = ({ title }) => {
    return (
        <h1>
            {title}
        </h1>
    )
}

export default PageTitle
