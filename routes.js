/**
 * title: route
 */
//dependancies
const { sampleHandler } = require("./heandlers/routeHandler/sampleHeandler");
const { tokenHandler } = require("./heandlers/routeHandler/tokenHandleer");
const { userHeandler } = require("./heandlers/routeHandler/userHeandler");
const route = {
  sample: sampleHandler,
  users: userHeandler,
  token: tokenHandler,
};

// export
module.exports = route;
