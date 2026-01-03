const { createLogger, format, transports } = require("winston");
const DailyRotateFile = require("winston-daily-rotate-file");
const path = require("path");

// log folder ka path
const logDir = path.join(__dirname, "../../logs");

const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.errors({ stack: true }),
    format.json()
  ),
  transports: [
    // 🔁 All logs (info, warn, error)
    new DailyRotateFile({
      filename: `${logDir}/app-%DATE%.log`,
      datePattern: "YYYY-MM-DD",
      maxSize: "10m",
      maxFiles: "30d",
    }),

    // 🔴 Only error logs
    new DailyRotateFile({
      filename: `${logDir}/error-%DATE%.log`,
      datePattern: "YYYY-MM-DD",
      level: "error",
      maxSize: "5m",
      maxFiles: "90d",
    }),
  ],
});

// 👨‍💻 Development me console output bhi
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new transports.Console({
      format: format.simple(),
    })
  );
}

module.exports = logger;
