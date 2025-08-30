require('dotenv').config();
const winston = require('winston');
const { Logtail } = require("@logtail/node");
const { LogtailTransport } = require("@logtail/winston");

const logtail = new Logtail(process.env.BETTERSTACK_SOURCE_TOKEN, {
  endpoint: `https://${process.env.BETTERSTACK_INGESTION_HOST}`,
});

const logger = winston.createLogger({
  level: "info",
  transports: [
    new winston.transports.Console(),
    new LogtailTransport(logtail)
  ]
});

// Exporta tanto o logger quanto o logtail para flush
module.exports = { logger, logtail };
