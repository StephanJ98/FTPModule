/**
 * Returns the Theorical Maximum Heart Rate
 * @param {Number} age 
 * @param {'m','M','f','F'} gender 
 * @returns Number
 */
exports.TheoricalMaxHeartRate = (age, gender) => {
    switch (String(gender).toLocaleLowerCase()) {
        case 'm':
            return 220 - age
        case 'f':
            return 226 - age
        default:
            return 223 - age
    }
}