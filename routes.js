/**
 * title: route
 */
//dependancies
const { sampleHandler } = require("./heandlers/routeHandler/sampleHeandler");
const { tokenHandler } = require("./heandlers/routeHandler/tokenHandleer");
const { userHeandler } = require("./heandlers/routeHandler/userHeandler");
const { checkHandler } = require("./heandlers/routeHandler/checkHandler");
const route = {
  sample: sampleHandler,
  users: userHeandler,
  token: tokenHandler,
  checks: checkHandler,
};

// export
module.exports = route;
