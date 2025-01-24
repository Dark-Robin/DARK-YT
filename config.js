const fs = require("fs");
if (fs.existsSync("config.env"))
  require("dotenv").config({ path: "./config.env" });

function convertToBool(text, fault = "true") {
  return text === fault ? true : false;
}
module.exports = {
  SESSION_ID: process.env.SESSION_ID || "f6owwbqL#Ko9eWfI9iglltHZV1HkIoCFg_Bz0b9oeNzA3oWqE0RY",
  MONGODB: process.env.MONGODB || "mongodb://mongo:WfzicwSgRYvnAvMvlAQzIAKxPLqiDIpX@junction.proxy.rlwy.net:38497",
  OWNER_NUM: process.env.OWNER_NUM || "94705900209",
};
