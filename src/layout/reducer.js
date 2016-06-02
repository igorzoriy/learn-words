import merge from 'lodash/merge'
import { OPEN_SIDEBAR, CLOSE_SIDEBAR } from './actions'
import { UPDATE_LOCATION } from 'react-router-redux'

const initialState = {
    sidebarOpen: false,
}

export default function layoutReducer (state = initialState, action) {
    const { type } = action
    switch (type) {
        case OPEN_SIDEBAR:
            return merge({}, state, {
                sidebarOpen: true,
            })

        case CLOSE_SIDEBAR:
        case UPDATE_LOCATION:
            return merge({}, state, {
                sidebarOpen: false,
            })

        default:
            return state
    }
}
