const fs = require("fs");
if (fs.existsSync("config.env"))
  require("dotenv").config({ path: "./config.env" });

function convertToBool(text, fault = "true") {
  return text === fault ? true : false;
}
module.exports = {
  SESSION_ID: process.env.SESSION_ID || "W6Z1nAzB#O3UzhRqWsrtbYR-YHEribdBBjP5S0y78rxgMrcS6OYA",
  MONGODB: process.env.MONGODB || "mongodb://mongo:WfzicwSgRYvnAvMvlAQzIAKxPLqiDIpX@junction.proxy.rlwy.net:38497",
  OWNER_NUM: process.env.OWNER_NUM || "94705900209",
};
