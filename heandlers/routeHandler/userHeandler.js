/**
 * title : user handler
 */

//depandencies
const { hash } = require("../../healpers/utilities");
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
    callback(405, `method not alowd`);
  }
};

handler._user.get = (requestproperties, callback) => {
  callback(200);
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
        lib.create("usersInfo", phone, userObject, (err, fd) => {
          if (!err && fd) {
            callback(200, { message: "user successfully created" });
          } else {
            callback(405, `cannot creating file`);
          }
        });
      } else {
        callback(400, { error: "this user is allready created" });
      }
    });
  } else {
    callback(`some is wrong with user information| from userhandler`);
  }
};
handler._user.put = (requestproperties, callback) => {
  // callback({ 'myLove': 'Meghla' })
};
handler._user.delete = (requestproperties, callback) => {
  // callback({ 'myLove': 'Meghla' })
};

module.exports = handler;
