import {
    OPEN_SIDEBAR,
    CLOSE_SIDEBAR,
    openSidebar,
    closeSidebar,
} from './actions'

describe('layout actions', () => {
    it('should create an action to open sidebar', () => {
        expect(openSidebar()).toEqual({
            type: OPEN_SIDEBAR,
        })
    })

    it('should create an action to close sidebar', () => {
        expect(closeSidebar()).toEqual({
            type: CLOSE_SIDEBAR,
        })
    })
})
