import expect from 'expect.js'
import reducer from './reducer'
import { ACCOUNT_DATA_UPDATE } from './actions'


describe('account reducer', () => {
    it('should return initial state', () => {
        expect(reducer(undefined, {})).to.be.eql({
            uid: null,
        })
    })

    it('should handle ACCOUNT_DATA_UPDATE', () => {
        const state = reducer(undefined, {
            type: ACCOUNT_DATA_UPDATE,
            uid: 'unique-id',
        })
        expect(state.uid).to.be('unique-id')
    })
})
