const fs = require("fs");
const path = require("path");

// scaffolding
const lib = {};

// base directory of the data folder;
lib.basedir = path.join(__dirname, "/../.data/");

lib.create = (dir, filename, data, callback) => {
  fs.open(
    `${lib.basedir}/${dir}/${filename}.json`,
    "wx",
    (err, fileDescriptor) => {
      if (!err && fileDescriptor) {
        const dataStingify = JSON.stringify(data);
        fs.writeFile(fileDescriptor, dataStingify, (err) => {
          if (!err) {
            fs.close(fileDescriptor, (err) => {
              if (!err) {
                callback(null, { message: "user created cuccessfully" });
              } else {
                callback({ error: `Cannot closed fs file` });
              }
            });
          } else {
            callback({ error: `cannot be write file` });
          }
        });
      } else {
        callback({
          err: `Error:: File does not created! may file Allrady exist`,
        });
      }
    }
  );
};

lib.read = (dir, filename, callback) => {
  fs.readFile(`${lib.basedir}/${dir}/${filename}.json`, "utf8", (err, data) => {
    if (!err) {
      callback(null, data);
    } else {
      callback(404, { message: "user not found" });
    }
  });
};

lib.update = (dir, filename, data, callback) => {
  fs.open(
    `${lib.basedir}/${dir}/${filename}.json`,
    "r+",
    (err, fileDescriptor) => {
      if (!err) {
        const dataString = JSON.stringify(data);
        fs.writeFile(fileDescriptor, dataString, (err) => {
          if (!err) {
            fs.close(fileDescriptor, (err) => {
              if (!err) {
                callback(null, { message: `User is updated` });
              } else {
                callback(500, { message: `cannot closing fs.` });
              }
            });
          } else {
            callback(500, { message: `cannot updating file` });
          }
        });
      } else {
        callback(500, { message: `cannot updating data, something is wrong` });
      }
    }
  );
};

lib.delete = (dir, filename, callback) => {
  fs.unlink(`${lib.basedir}/${dir}/${filename}.json`, (err) => {
    if (!err) {
      callback(null, { message: `Cannot deleting file` });
    } else {
      callback(500, { message: "user cand delete" });
    }
  });
};

module.exports = lib;
