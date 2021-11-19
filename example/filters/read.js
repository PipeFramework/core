module.exports = (input) => {
  const fs = require("fs");
  return fs.readFileSync(`${process.cwd()}/data/file.txt`).toString();
};
