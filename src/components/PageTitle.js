import React from 'react'
import PropTypes from 'prop-types'

const PageTitle = ({ title }) => {
    return (
        <h1>
            { title }
        </h1>
    )
}

PageTitle.displayName = 'PageTitle'
PageTitle.propTypes = {
    title: PropTypes.string.isRequired,
}

export default PageTitle
