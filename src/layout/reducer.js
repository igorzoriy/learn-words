import merge from 'lodash/merge'
import { OPEN_SIDEBAR, CLOSE_SIDEBAR } from './actions'

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
            return merge({}, state, {
                sidebarOpen: false,
            })

        default:
            return state
    }
}
