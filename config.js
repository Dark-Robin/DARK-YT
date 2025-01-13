const fs = require("fs");
if (fs.existsSync("config.env"))
  require("dotenv").config({ path: "./config.env" });

function convertToBool(text, fault = "true") {
  return text === fault ? true : false;
}
module.exports = {
  SESSION_ID: process.env.SESSION_ID || "auBB2TIZ#diVrubNzGgufcR1BXeHQWnKPHFK4DdcOXVwy_Tur6BQ",
  MONGODB: process.env.MONGODB || "mongodb://mongo:pOFewcHlYXEBBgoOutIxGoXyvoKgBeNs@autorack.proxy.rlwy.net:28275",
  OWNER_NUM: process.env.OWNER_NUM || "94705900209",
};
