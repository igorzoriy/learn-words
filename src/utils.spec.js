/*eslint no-magic-numbers: 0 */
import expect from 'expect.js'
import {
    calculateNewPosition,
} from './utils'

describe('vocabulary utils', () => {
    it('should calculate new position for flashcard carousel', () => {
        expect(calculateNewPosition(-1, 5, true)).to.be(0)
        expect(calculateNewPosition(-100, 5, true)).to.be(0)
        expect(calculateNewPosition(0, 5, true)).to.be(1)
        expect(calculateNewPosition(1, 5, true)).to.be(2)
        expect(calculateNewPosition(4, 5, true)).to.be(0)
        expect(calculateNewPosition(5, 5, true)).to.be(0)
        expect(calculateNewPosition(6, 5, true)).to.be(0)

        expect(calculateNewPosition(-1, 5, false)).to.be(4)
        expect(calculateNewPosition(-100, 5, false)).to.be(4)
        expect(calculateNewPosition(0, 5, false)).to.be(4)
        expect(calculateNewPosition(1, 5, false)).to.be(0)
        expect(calculateNewPosition(4, 5, false)).to.be(3)
        expect(calculateNewPosition(5, 5, false)).to.be(4)
        expect(calculateNewPosition(6, 5, false)).to.be(4)
    })
})
