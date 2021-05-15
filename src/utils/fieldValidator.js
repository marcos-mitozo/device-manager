export function isLongEnough(field, value) {
    if (value.length === 0) {
        throw new Error(`Field ${field} should not be empty!`)
    }
}

export function isTooLong(field, value, limit) {
    if (value.length > limit) {
        throw new Error(`Field ${field} has exceeded the maximum number of 128 characters!`)
    }
}

export function isPositive(field, value) {
    if (value <= 0) {
        throw new Error (`The value for the field ${field} should be greater then 0!`)
    }
}