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
    handler._token[method](requestproperties, callback);
  } else {
    callback(405, { message: `method not alowd` });
  }
};

handler._token.get = (requestproperties, callback) => {
  //geting tockrn ID fromquery object\
  const ToKenId =
    typeof requestproperties.queryStringObj.id === "string" &&
    requestproperties.queryStringObj.id.trim().length === 20
      ? requestproperties.queryStringObj.id
      : false;

  if (ToKenId) {
    lib.read("Tokens", ToKenId, (err, ToKenData) => {
      if (!err && ToKenData) {
        const token = { ...parseJson(ToKenData) };
        callback(200, { token });
      } else {
        callback(404, { error: "token not not found" });
      }
    });
  } else {
    callback(404, { error: "Token not found | last" });
  }
};
handler._token.post = (requestproperties, callback) => {
  //
  const users_info = requestproperties.body;

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

  //chack password and phone is here
  if (phone && password) {
    lib.read("usersInfo", phone, (err, userData) => {
      if (!err) {
        //    valided user and pass is matchesc
        if (parseJson(userData).password === hash(password)) {
          const tokenID = createToken(20);
          const expireDate = Date.now() + 60 * 60 * 1000;
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
              callback(200, { response: "Token created successfully" });
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
// update theb Token
handler._token.put = (requestproperties, callback) => {
  const token_info = requestproperties.body;

  const id =
    typeof token_info.id === "string" && token_info.id.trim().length === 20
      ? token_info.id
      : false;

  const extend =
    typeof token_info.extend === "boolean" && token_info.extend === true
      ? true
      : false;

  if (id && extend) {
    lib.read("Tokens", id, (err, tokenData) => {
      const tokenObj = parseJson(tokenData);
      console.log(parseJson(tokenData), tokenData);

      if (tokenObj.expireDate > Date.now()) {
        tokenObj.expireDate = Date.now() + 60 * 60 * 1000;
        //update expiration date
        lib.update("Tokens", id, tokenObj, (err2) => {
          if (!err2) {
            callback(200, {
              error: "token expire date successfully updated!",
            });
          } else {
            callback(500, { error: "Some surverside Error!", error: err2 });
          }
        });
      } else {
        callback(404, { error: "token is allready expired!", err });
      }
    });
  } else {
    callback(404, { error: "wrong request" });
  }
};
//delete tolen
handler._token.delete = (requestproperties, callback) => {
  const id =
    typeof requestproperties.queryStringObj.id === "string" &&
    requestproperties.queryStringObj.id.trim().length === 20
      ? requestproperties.queryStringObj.id
      : false;

  lib.delete("Tokens", id, (err, response) => {
    if (!err) {
      callback(200, response);
    } else {
      callback(response);
    }
  });
};

handler._token.verify = (id, phone, callback) => {
  lib.read("Tokens", id, (err, tokenData) => {
    if (!err && tokenData) {
      if (
        parseJson(tokenData).phone === phone &&
        parseJson(tokenData).expireDate > Date.now()
      ) {
        callback(true);
      } else {
        callback(false);
      }
    } else {
      callback(false);
    }
  });
};

module.exports = handler;
