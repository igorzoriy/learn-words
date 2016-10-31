import reducer from './reducer'
import {
    OPEN_SIDEBAR,
    CLOSE_SIDEBAR,
} from './actions'

describe('layout reducer', () => {
    it('should return the initial state', () => {
        const initialState = reducer(undefined, {})
        expect(initialState.sidebarOpen).toBe(false)
    })

    it('should handle OPEN_SIDEBAR', () => {
        const action = {
            type: OPEN_SIDEBAR,
        }
        const state = reducer(undefined, action)
        expect(state.sidebarOpen).toBe(true)
    })

    it('should handle CLOSE_SIDEBAR and UPDATE_LOCATION', () => {
        const action = {
            type: CLOSE_SIDEBAR,
        }
        const state = reducer(undefined, action)
        expect(state.sidebarOpen).toBe(false)
    })
})
