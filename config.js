const fs = require("fs");
if (fs.existsSync("config.env"))
  require("dotenv").config({ path: "./config.env" });

function convertToBool(text, fault = "true") {
  return text === fault ? true : false;
}
module.exports = {
  SESSION_ID: process.env.SESSION_ID || "D24gnSrA#4drlzUZKugsajUl8JRTAohZ7qCviPUWIjAPlRGb99nU",
  OWNER_NUM: process.env.OWNER_NUM || "94705900209",
  PREFIX: process.env.PREFIX || ".",
  ALIVE_IMG: process.env.ALIVE_IMG || "https://raw.githubusercontent.com/Dark-Robin/Bot-Helper/refs/heads/main/autoimage/Bot%20robin%20iz%20alive.jpg",
  ALIVE_MSG: process.env.ALIVE_MSG || "Hellow I am alive now\n\n> ROBIN ALIVE MSG",
  AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "true",
  MODE: process.env.MODE || "public",
  AUTO_VOICE: process.env.AUTO_REPLY || "true",
  AUTO_STICKER: process.env.AUTO_STICKER || "true",
  AUTO_REPLY: process.env.AUTO_REPLY || "true",
  GEMINI_API_KEY: process.env.GEMINI_API_KEY || "AIzaSyBbdqjntQrW225lPyqJKj8rJXYZ57zY8Fg",
};
