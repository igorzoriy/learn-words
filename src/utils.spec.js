/*eslint no-magic-numbers: 0 */
import expect from 'expect.js'
import {
    calculateNewPosition,
    getRandomItemsFromArray,
} from './utils'

describe('utils', () => {
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

    it('should get random items from array', () => {
        let array = [1, 2, 3, 4, 5, 6, 7, 8, 9]
        let result = []

        result = getRandomItemsFromArray(array, 2)
        expect(result.length).to.be(2)
        expect(array).to.contain(result[0])
        expect(array).to.contain(result[1])

        let slicedArray = array.slice(0, array.length - 3)
        let exclude = array.slice(array.length - 3)
        result = getRandomItemsFromArray(array, 4, exclude)
        expect(result.length).to.be(4)
        expect(slicedArray).to.contain(result[0])
        expect(slicedArray).to.contain(result[1])
        expect(slicedArray).to.contain(result[2])
        expect(slicedArray).to.contain(result[3])
        expect(exclude).to.not.contain(result[0])
        expect(exclude).to.not.contain(result[1])
        expect(exclude).to.not.contain(result[2])
        expect(exclude).to.not.contain(result[3])
    })
})
