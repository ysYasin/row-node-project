/**
 * title: route
 */
//depandencies
const crypto = require("node:crypto");
const environment = require("../heandlers/handleEnvironment/environment");

//scaffolding
const utilities = {};

// parse json sting to object
utilities.parseJson = (jsonString) => {
  let parsedJson = {};

  try {
    parsedJson = JSON.parse(jsonString);
    return parsedJson;
  } catch (error) {
    console.log(error);
    parsedJson = {};
  }
};

// parse json sting to object
utilities.hash = (str) => {
  if ((typeof str === "string", str.length > 0)) {
    let hmac = crypto
      .createHmac("sha256", environment.secrateKey)
      .update(str)
      .digest("hex");

    return hmac;
  } else {
    return false;
  }
};

// export scafolding utilities;
module.exports = utilities;
