/**
 * title : user handler
 */

//depandencies
const { hash } = require("../../healpers/utilities");
const { parseJson } = require("../../healpers/utilities");
const lib = require("../../lib/data");

// module scaffolding;
const handler = {};
handler._user = {};

handler.userHeandler = (requestproperties, callback) => {
  const acceptedMethods = ["get", "post", "put", "delete"];
  const method = requestproperties.method.trim();
  if (acceptedMethods.indexOf(method) > -1) {
    handler._user[method](requestproperties, callback);
    // console.log(handler._user[method]);
  } else {
    callback(405, { message: `method not alowd` });
  }
};

handler._user.get = (requestproperties, callback) => {
  //geting query object\
  //   console.log(requestproperties.queryStringObj.phone);
  const phone =
    typeof requestproperties.queryStringObj.phone === "string" &&
    requestproperties.queryStringObj.phone.trim().length === 11 &&
    requestproperties.queryStringObj.phone.startsWith("01", 0)
      ? requestproperties.queryStringObj.phone
      : false;

  if (phone) {
    lib.read("usersInfo", phone, (err, data) => {
      if (!err && data) {
        console.log(data);
        const user = { ...parseJson(data) };
        delete user.password;
        callback(200, { user });
      } else {
        callback(404, { error: "User not found" });
      }
    });
  } else {
    callback(404, { error: "User not found" });
  }
};
handler._user.post = (requestproperties, callback) => {
  //
  const users_info = requestproperties.body;

  const fName =
    typeof users_info.firstName === "string" &&
    users_info.firstName.trim().length > 1
      ? users_info.firstName
      : false;

  const LName =
    typeof users_info.lastName === "string" &&
    users_info.lastName.trim().length > 1
      ? users_info.lastName
      : false;

  const phone =
    typeof users_info.phone === "string" &&
    users_info.phone.trim().length === 11 &&
    users_info.phone.startsWith("01", 0)
      ? users_info.phone
      : false;

  const password =
    typeof users_info.password === "string" &&
    users_info.password.trim().length >= 6
      ? users_info.password
      : false;

  const tosAgreement =
    typeof users_info.tosAgreement === "boolean" &&
    users_info.tosAgreement === true
      ? users_info.tosAgreement
      : false;

  if (fName && LName && phone && password && tosAgreement) {
    lib.read("userInfo", phone, (err) => {
      if (err) {
        let userObject = {
          fName,
          LName,
          phone,
          password: hash(password),
          tosAgreement,
        };
        lib.create("usersInfo", phone, userObject, (err, response) => {
          if (err) {
            callback(500, response);
          } else {
            callback(200, response);
          }
        });
      } else {
        callback(500, { message: "this user is allready created" });
      }
    });
  } else {
    callback(405, {
      message: `some is wrong with user information| from userhandler`,
    });
  }
};
handler._user.put = (requestproperties, callback) => {
  const users_info = requestproperties.body;

  const fName =
    typeof users_info.firstName === "string" &&
    users_info.firstName.trim().length > 1
      ? users_info.firstName
      : false;

  const LName =
    typeof users_info.lastName === "string" &&
    users_info.lastName.trim().length > 1
      ? users_info.lastName
      : false;

  const phone =
    typeof users_info.phone === "string" &&
    users_info.phone.trim().length === 11 &&
    users_info.phone.startsWith("01", 0)
      ? users_info.phone
      : false;

  const password =
    typeof users_info.password === "string" &&
    users_info.password.trim().length >= 6
      ? users_info.password
      : false;

  if (fName && LName && phone && password) {
    let userObject = {
      fName,
      LName,
      phone,
      password: hash(password),
    };
    lib.update("usersInfo", phone, userObject, (err, response) => {
      if (!err) {
        callback(200, { message: "user updated successfully" });
      } else {
        callback(response);
      }
    });
  } else {
    callback(404, { error: "cannot find user u update" });
  }
};
handler._user.delete = (requestproperties, callback) => {
  const phone =
    typeof requestproperties.queryStringObj.phone === "string" &&
    requestproperties.queryStringObj.phone.trim().length === 11 &&
    requestproperties.queryStringObj.phone.startsWith("01", 0)
      ? requestproperties.queryStringObj.phone
      : false;

  lib.delete("usersInfo", phone, (err, response) => {
    if (!err) {
      callback(200, response);
    } else {
      callback(response);
    }
  });
};

module.exports = handler;
