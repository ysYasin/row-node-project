/**
 * title : checkHandler
 * description : checkHandler will check user inputed URL up/Down
 */

//depandencies
const { ESLint } = require("eslint");
const { hash, createToken } = require("../../healpers/utilities");
const { parseJson } = require("../../healpers/utilities");
const lib = require("../../lib/data");
const { _token } = require("./tokenHandleer");

// module scaffolding;
const handler = {};
handler._check = {};

handler.checkHandler = (requestproperties, callback) => {
  const acceptedMethods = ["get", "post", "put", "delete"];
  const method = requestproperties.method.trim();
  if (acceptedMethods.indexOf(method) > -1) {
    handler._check[method](requestproperties, callback);
  } else {
    callback(405, { message: `method not alowd` });
  }
};

handler._check.get = (requestproperties, callback) => {
  //geting query object\

  const id =
    typeof requestproperties.queryStringObj.id === "string" &&
    requestproperties.queryStringObj.id.trim().length === 15
      ? requestproperties.queryStringObj.id
      : false;

  if (id) {
    const token =
      typeof requestproperties.headerObj.token === "string"
        ? requestproperties.headerObj.token
        : false;

    lib.read("checks", id, (err, data) => {
      if (!err && data) {
        _token.verify(token, parseJson(data).userPhone, (tokenValid) => {
          if (tokenValid) {
            callback(200, parseJson(data));
          } else {
            callback(500, { error: "token cannot varify try agein" });
          }
        });
      } else {
        callback(404, { error: "Bad requers | not found" });
      }
    });
  } else {
    callback(401, { error: "something wrong in your request" });
  }
};
handler._check.post = (requestproperties, callback) => {
  //
  const cheks_info = requestproperties.body;
  const protocol =
    typeof cheks_info.protocol === "string" &&
    ["http", "https"].indexOf(cheks_info.protocol) > -1
      ? cheks_info.protocol
      : false;

  const url =
    typeof cheks_info.url === "string" && cheks_info.url.trim().length > 0
      ? cheks_info.url
      : false;

  const method =
    typeof cheks_info.method === "string" &&
    ["GET", "POST", "PUT", "DELETE"].indexOf(cheks_info.method) > -1
      ? cheks_info.method
      : false;

  const successCode =
    typeof cheks_info.successCode === "object" &&
    cheks_info.successCode instanceof Array
      ? cheks_info.successCode
      : false;

  const timeoutSecond =
    typeof cheks_info.timeoutSecond === "number" &&
    cheks_info.timeoutSecond % 1 === 0 &&
    cheks_info.timeoutSecond > 1 &&
    cheks_info.timeoutSecond <= 5
      ? cheks_info.timeoutSecond
      : false;

  if (protocol && url && method && successCode && timeoutSecond) {
    const token =
      typeof requestproperties.headerObj.token === "string"
        ? requestproperties.headerObj.token
        : false;

    lib.read("Tokens", token, (err, tokenObj) => {
      if (!err && tokenObj) {
        const userPhone = parseJson(tokenObj).phone;

        lib.read("usersInfo", userPhone, (err2, userInfo) => {
          const user_data = parseJson(userInfo);
          if ((!err2, userInfo)) {
            _token.verify(token, userPhone, (isTokenValid) => {
              if (isTokenValid) {
                const userChecks =
                  typeof user_data.checks === "object" &&
                  user_data.checks instanceof Array
                    ? user_data.checks
                    : [];

                if (userChecks.length <= 5) {
                  //create chack object
                  const checkId = createToken(15);
                  const checkObj = {
                    id: checkId,
                    userPhone,
                    protocol,
                    url,
                    method,
                    successCode,
                    timeoutSecond,
                  };
                  //seve the object on database
                  lib.create("checks", checkId, checkObj, (err3) => {
                    if (!err3) {
                      // add add check id to user obj
                      userChecks.push(checkId);
                      user_data.checks = userChecks;

                      // update user object with chack;
                      lib.update(
                        "usersInfo",
                        user_data.phone,
                        user_data,
                        (err4) => {
                          if (!err4) {
                            callback(200, user_data);
                          } else {
                            callback(403, {
                              error: "there was a problem in serverside",
                            });
                          }
                        }
                      );
                    } else {
                      callback(403, {
                        error: "there was a problem in serverside",
                      });
                    }
                  });
                } else {
                  callback(403, {
                    error: "you cross the chack limit",
                  });
                }
              } else {
                callback(403, {
                  error: "Token in invalid",
                });
              }
            });
          } else {
            callback(403, {
              error: "Authentication problem",
            });
          }
        });
      } else {
        callback(404, {
          error: "user not found",
        });
      }
    });
  } else {
    callback(404, {
      error: "something we found wrong, check is everything ok ?",
    });
  }
};
handler._check.put = (requestproperties, callback) => {
  const cheks_info = requestproperties.body;

  const id =
    typeof requestproperties.body.id === "string" &&
    requestproperties.body.id.trim().length === 15
      ? requestproperties.body.id
      : false;

  const protocol =
    typeof cheks_info.protocol === "string" &&
    ["http", "https"].indexOf(cheks_info.protocol) > -1
      ? cheks_info.protocol
      : false;

  const url =
    typeof cheks_info.url === "string" && cheks_info.url.trim().length > 0
      ? cheks_info.url
      : false;

  const method =
    typeof cheks_info.method === "string" &&
    ["GET", "POST", "PUT", "DELETE"].indexOf(cheks_info.method) > -1
      ? cheks_info.method
      : false;

  const successCode =
    typeof cheks_info.successCode === "object" &&
    cheks_info.successCode instanceof Array
      ? cheks_info.successCode
      : false;

  const timeoutSecond =
    typeof cheks_info.timeoutSecond === "number" &&
    cheks_info.timeoutSecond % 1 === 0 &&
    cheks_info.timeoutSecond > 1 &&
    cheks_info.timeoutSecond <= 5
      ? cheks_info.timeoutSecond
      : false;

  if (id) {
    if (protocol || url || method || successCode || timeoutSecond) {
      const token =
        typeof requestproperties.headerObj.token === "string"
          ? requestproperties.headerObj.token
          : false;

      lib.read("checks", id, (err, checks) => {
        const parseChecks = parseJson(checks);
        console.log(parseChecks);
        if (!err && checks) {
          _token.verify(token, parseJson(checks).userPhone, (tokenvalid) => {
            if (tokenvalid) {
              if (protocol) {
                parseChecks.protocol = protocol;
              } else if (url) {
                parseChecks.url = url;
              } else if (method) {
                parseChecks.method = method;
              } else if (successCode) {
                parseChecks.successCode = successCode;
              } else if (timeoutSecond) {
                parseChecks.timeoutSecond = timeoutSecond;
              }

              lib.update("checks", id, parseChecks, (err2) => {
                if (!err2) {
                  callback(200);
                } else {
                  callback(500, { message: "there was a server side error" });
                }
              });
            } else {
              callback(403, { error: "validation error" });
            }
          });
        } else {
          callback(500, { message: "there is something wrong in server" });
        }
      });
    } else {
      callback(404, { message: "nothing to update" });
    }
  } else {
    callback(404, { error: "wrong request" });
  }
};

handler._check.delete = (requestproperties, callback) => {
  const id =
    typeof requestproperties.queryStringObj.id === "string" &&
    requestproperties.queryStringObj.id.trim().length === 15
      ? requestproperties.queryStringObj.id
      : false;

  if (id) {
    const token =
      typeof requestproperties.headerObj.token === "string"
        ? requestproperties.headerObj.token
        : false;

    lib.read("checks", id, (err, data) => {
      if (!err && data) {
        const parsedData = parseJson(data);

        _token.verify(token, parsedData.userPhone, (tokenValid) => {
          if (tokenValid) {
            lib.delete("checks", id, (err2) => {
              if (!err2) {
                lib.read(
                  "usersInfo",
                  parsedData.userPhone,
                  (err3, checksData) => {
                    if ((!err3, checksData)) {
                      const parseChecksData = parseJson(checksData);
                      console.log(parseChecksData);
                      const userChecks =
                        typeof parseChecksData.checks === "object" &&
                        parseChecksData.checks instanceof Array
                          ? parseChecksData.checks
                          : [];
                      userChecks.slice(id, 1);
                      parseChecksData.checks = userChecks;

                      lib.update(
                        "usersInfo",
                        parsedData.userPhone,
                        parseChecksData,
                        (err4) => {
                          if (!err4) {
                            callback(200);
                          } else {
                            callback(500, {
                              err: "there is an error in server side",
                            });
                          }
                        }
                      );
                    } else {
                      callback(500, {
                        message: "there was a server side problem",
                      });
                    }
                  }
                );
              } else {
                callback(404, { message: "ther is some error in server side" });
              }
            });
          } else {
            callback(500, { error: "token cannot varify try agein" });
          }
        });
      } else {
        callback(404, { error: "Bad requers | not found" });
      }
    });
  } else {
    callback(401, { error: "something wrong in your request" });
  }
};

module.exports = handler;
