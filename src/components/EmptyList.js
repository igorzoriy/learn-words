import React from 'react'
import Alert from './Alert'

const EmptyList = () => {
    return <Alert type="info" message="Your list of phrases is empty." />
}

EmptyList.displayName = 'EmptyList'

export default EmptyList
