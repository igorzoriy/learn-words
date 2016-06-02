import expect from 'expect.js'
import {
    OPEN_SIDEBAR,
    CLOSE_SIDEBAR,
    openSidebar,
    closeSidebar,
} from './actions'

describe('layout actions', () => {
    it('should create an action to open sidebar', () => {
        expect(openSidebar()).to.eql({
            type: OPEN_SIDEBAR,
        })
    })

    it('should create an action to close sidebar', () => {
        expect(closeSidebar()).to.eql({
            type: CLOSE_SIDEBAR,
        })
    })
})
