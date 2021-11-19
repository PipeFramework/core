module.exports = (input) => {
  const fs = require("fs");
  return fs.readFileSync(`${process.cwd()}/example/file.txt`).toString();
};
