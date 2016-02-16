import expect from 'expect.js'
import { ACCOUNT_DATA_UPDATE, updateUserData } from './actions'

describe('account actions', () => {
    it('should create an action to updatr user data', () => {
        expect(updateUserData({
            uid: 'my-unique-id',
        })).to.eql({
            type: ACCOUNT_DATA_UPDATE,
            uid: 'my-unique-id',
        })
    })
})
