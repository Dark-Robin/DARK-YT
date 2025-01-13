const fs = require("fs");
if (fs.existsSync("config.env"))
  require("dotenv").config({ path: "./config.env" });

function convertToBool(text, fault = "true") {
  return text === fault ? true : false;
}
module.exports = {
  SESSION_ID: process.env.SESSION_ID || "OnYWgb6A#Yd_e89Vhtz7N0BcnlSGhN_MN1tG7mO8jhR-CeuDbY38",
  MONGODB: process.env.MONGODB || "mongodb://mongo:WfzicwSgRYvnAvMvlAQzIAKxPLqiDIpX@junction.proxy.rlwy.net:38497",
  OWNER_NUM: process.env.OWNER_NUM || "94705900209",
};
