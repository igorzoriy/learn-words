import { OPEN_SIDEBAR, CLOSE_SIDEBAR } from './actions'
import { LOCATION_CHANGE, CALL_HISTORY_METHOD } from 'react-router-redux'

const initialState = {
    sidebarOpen: false,
}

export default function layoutReducer (state = initialState, action) {
    const { type } = action
    switch (type) {
        case OPEN_SIDEBAR:
            return Object.assign({}, state, {
                sidebarOpen: true,
            })

        case CLOSE_SIDEBAR:
        case LOCATION_CHANGE:
        case CALL_HISTORY_METHOD:
            return Object.assign({}, state, {
                sidebarOpen: false,
            })

        default:
            return state
    }
}
