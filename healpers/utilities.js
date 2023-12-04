/**
 * title: route
 */

//scaffolding
const utilities = {};

utilities.parseJson = (jsonString) => {
    let parsedJson = {};

    try {
        parsedJson = JSON.parse(jsonString)
    } catch (error) {
        parsedJson = {}
    }
}
module.exports = utilities;