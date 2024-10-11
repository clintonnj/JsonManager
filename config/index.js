const dotenv = require("dotenv");
dotenv.config();
module.exports = {
  port: process.env.PORT,
  originsAllowed: process.env.ORIGINS_ALLOWED,
  versionConfig: process.env.VERSION_CONFIG,
  nodeEnv: process.env.NODE_ENV
  };
