export const findDifferences = (obj1, obj2) => {
    const differences = {};

    for (const key in obj1) {
        if (Object.prototype.hasOwnProperty.call(obj1, key) && Object.prototype.hasOwnProperty.call(obj2, key)) {
            if (obj1[key] !== obj2[key]) {
                differences[key] =  obj2[key]
            }
        }
    }

    return differences;
}
