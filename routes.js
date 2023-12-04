/**
 * title: route
 */
//dependancies
const { sampleHandler } = require('./heandlers/routeHandler/sampleHeandler');
const { userHeandler } = require('./heandlers/routeHandler/userHeandler');
const route = {
    sample: sampleHandler,
    users: userHeandler,
}

// export
module.exports = route;