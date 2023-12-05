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

// create random string sting to object
utilities.createToken = (strLenth) => {
  const length =
    typeof strLenth === "number" && strLenth > 0 ? strLenth : false;

  if (length) {
    const possibleCarecters = "qwertyuioplkjhgfdaszxcvbnm1234567890";
    let finalToken = "";

    for (let i = 0; i < length; i++) {
      const randomCharecters = possibleCarecters.charAt(
        Math.floor(Math.random() * possibleCarecters.length)
      );
      finalToken += randomCharecters;
    }
    return finalToken;
    //
  } else {
    return;
  }
};

// export scafolding utilities;
module.exports = utilities;
