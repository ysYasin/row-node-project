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
      if (!err) {
        const dataStingify = JSON.stringify(data);
        fs.writeFile(fileDescriptor, dataStingify, (err) => {
          if (!err) {
            fs.close(fileDescriptor, (err) => {
              if (err) {
                callback(`Cannot closed fs file`);
              } else {
                callback("user created cuccessfully");
              }
            });
          } else {
            callback(`cannot be write file`);
          }
        });
      } else {
        callback(err, `Error:: File does not created! may file Allrady exist`);
      }
    }
  );
};

lib.read = (dir, filename, callback) => {
  fs.readFile(`${lib.basedir}/${dir}/${filename}.json`, "utf8", (err, data) => {
    callback(err, data);
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
              if (err) {
                callback(`cannot closing fs.${fileDescriptor}`);
              }
            });
          } else {
            callback(`cannot updating data`);
          }
        });
      } else {
        callback(`cannot updating data`);
      }
    }
  );
};

lib.delete = (dir, filename, callback) => {
  fs.unlink(`${lib.basedir}/${dir}/${filename}.json`, (err) => {
    callback(`Cannot deleting file`);
  });
};

module.exports = lib;
