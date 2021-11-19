module.exports = (input) => {
  const fs = require("fs");
  fs.writeFileSync(input[1], input[0]);
  return `${input[0]} écrit dans le fichier ${input[1]}`;
};
