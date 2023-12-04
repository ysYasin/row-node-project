/**
 * title : token handler handler
 */

//depandencies
const { hash, parseJson, createToken } = require("../../healpers/utilities");
const lib = require("../../lib/data");

// module scaffolding;
const handler = {};
handler._token = {};

handler.tokenHandler = (requestproperties, callback) => {
  //accepting valid methodb for this application
  const acceptedMethods = ["get", "post", "put", "delete"];
  //trim the methode came by requestproperties
  const method = requestproperties.method.trim();
  //diclire thie method
  if (acceptedMethods.indexOf(method) > -1) {
    console.log(requestproperties.body);
    handler._token[method](requestproperties, callback);
  } else {
    callback(405, { message: `method not alowd` });
  }
};

handler._token.get = (requestproperties, callback) => {
  //geting query object\
  const phone =
    typeof requestproperties.queryStringObj.phone === "string" &&
    requestproperties.queryStringObj.phone.trim().length === 11 &&
    requestproperties.queryStringObj.phone.startsWith("01", 0)
      ? requestproperties.queryStringObj.phone
      : false;

  //   if (phone) {
  //     lib.read("usersInfo", phone, (err, data) => {
  //       if (!err && data) {
  //         console.log(data);
  //         const user = { ...parseJson(data) };
  //         delete user.password;
  //         callback(200, { user });
  //       } else {
  //         callback(404, { error: "User not found" });
  //       }
  //     });
  //   } else {
  //     callback(404, { error: "User not found" });
  //   }
};
handler._token.post = (requestproperties, callback) => {
  //
  const users_info = requestproperties.body;
  console.log(requestproperties.body);

  //password and phone number

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
  console.log(phone);
  //chack password and phone is here
  if (phone && password) {
    lib.read("usersInfo", phone, (err, userData) => {
      if (!err) {
        //    valided user and pass is matchesc
        if (parseJson(userData).password === hash(password)) {
          const tokenID = createToken(20);
          const expireDate = new Date() + 60 * 60 * 1000;
          const tokenObj = {
            phone,
            id: tokenID,
            expireDate,
          };

          //stor token in database
          lib.create("Tokens", tokenID, tokenObj, (err, response) => {
            if (err) {
              callback(500, {
                response: "ther was an Error in server site|creat tokenhandler",
              });
            } else {
              callback(200, response);
            }
          });
        } else {
          callback(404, {
            message: "invalid passwor submitted! please give a valied Password",
          });
        }
      } else {
        callback(500, { message: "there is an error", err });
      }
    });
  } else {
    callback(405, {
      message: `make sure phon number and user are valied| from Tokenhandler`,
    });
  }
};
// handler._token.put = (requestproperties, callback) => {
//   const users_info = requestproperties.body;

//   const fName =
//     typeof users_info.firstName === "string" &&
//     users_info.firstName.trim().length > 1
//       ? users_info.firstName
//       : false;

//   const LName =
//     typeof users_info.lastName === "string" &&
//     users_info.lastName.trim().length > 1
//       ? users_info.lastName
//       : false;

//   const phone =
//     typeof users_info.phone === "string" &&
//     users_info.phone.trim().length === 11 &&
//     users_info.phone.startsWith("01", 0)
//       ? users_info.phone
//       : false;

//   const password =
//     typeof users_info.password === "string" &&
//     users_info.password.trim().length >= 6
//       ? users_info.password
//       : false;

//   if (fName && LName && phone && password) {
//     let userObject = {
//       fName,
//       LName,
//       phone,
//       password: hash(password),
//     };
//     lib.update("usersInfo", phone, userObject, (err, response) => {
//       if (!err) {
//         callback(200, { message: "user updated successfully" });
//       } else {
//         callback(response);
//       }
//     });
//   } else {
//     callback(404, { error: "cannot find user u update" });
//   }
// };
// handler._token.delete = (requestproperties, callback) => {
//   const phone =
//     typeof requestproperties.queryStringObj.phone === "string" &&
//     requestproperties.queryStringObj.phone.trim().length === 11 &&
//     requestproperties.queryStringObj.phone.startsWith("01", 0)
//       ? requestproperties.queryStringObj.phone
//       : false;

//   lib.delete("usersInfo", phone, (err, response) => {
//     if (!err) {
//       callback(200, response);
//     } else {
//       callback(response);
//     }
//   });
// };

module.exports = handler;
