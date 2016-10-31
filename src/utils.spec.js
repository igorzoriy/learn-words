/*eslint no-magic-numbers: 0 */
import 'core-js/modules/es7.array.includes'
import {
    calculateNewPosition,
    getRandomItemsFromArray,
} from './utils'

describe('utils', () => {
    it('should calculate new position for flashcard carousel', () => {
        expect(calculateNewPosition(-1, 5, true)).toBe(0)
        expect(calculateNewPosition(-100, 5, true)).toBe(0)
        expect(calculateNewPosition(0, 5, true)).toBe(1)
        expect(calculateNewPosition(1, 5, true)).toBe(2)
        expect(calculateNewPosition(4, 5, true)).toBe(0)
        expect(calculateNewPosition(5, 5, true)).toBe(0)
        expect(calculateNewPosition(6, 5, true)).toBe(0)

        expect(calculateNewPosition(-1, 5, false)).toBe(4)
        expect(calculateNewPosition(-100, 5, false)).toBe(4)
        expect(calculateNewPosition(0, 5, false)).toBe(4)
        expect(calculateNewPosition(1, 5, false)).toBe(0)
        expect(calculateNewPosition(4, 5, false)).toBe(3)
        expect(calculateNewPosition(5, 5, false)).toBe(4)
        expect(calculateNewPosition(6, 5, false)).toBe(4)
    })

    it('should get random items from array', () => {
        let array = [1, 2, 3, 4, 5, 6, 7, 8, 9]
        let result = []

        result = getRandomItemsFromArray(array, 2)
        expect(result.length).toBe(2)
        expect(array).toContain(result[0])
        expect(array).toContain(result[1])

        let slicedArray = array.slice(0, array.length - 3)
        let exclude = array.slice(array.length - 3)
        result = getRandomItemsFromArray(array, 4, exclude)
        expect(result.length).toBe(4)
        expect(slicedArray).toContain(result[0])
        expect(slicedArray).toContain(result[1])
        expect(slicedArray).toContain(result[2])
        expect(slicedArray).toContain(result[3])
        expect(exclude).not.toContain(result[0])
        expect(exclude).not.toContain(result[1])
        expect(exclude).not.toContain(result[2])
        expect(exclude).not.toContain(result[3])
    })
})
