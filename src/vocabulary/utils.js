export function calculateNewPosition (index, length, next = true) {
    if (index < 0) {
        return next ? 0 : length - 1
    } else if (index === 0) {
        return next ? ++index : length - 1
    } else if (index === length - 1) {
        return next ? 0 : --index
    } else if (index >= length) {
        return next ? 0 : length - 1
    } else {
        return next ? ++index : --index
    }
}
