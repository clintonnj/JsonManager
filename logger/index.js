var winston = require('winston');
require('winston-daily-rotate-file');

/**
 * Define your severity levels.
 * With them, You can create log files,
 * see or hide levels based on the running ENV.
 */
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
  trace: 5,
  all: 6,
  off: 7,
};

/** This method set the current severity based on
* the current NODE_ENV: show all the log levels
* if the server was run in development mode; otherwise,
* if it was run in production/stage, show only info, warn and error messages.
*/
const level = () => {
  const env = process.env.NODE_ENV || 'development';
  const isDevelopment = env === 'development';
  return isDevelopment ? 'debug' : 'info';
};


// Chose the aspect of your log customizing the log format.
const format = winston.format.combine(
  // Add the message timestamp with the preferred format
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss,SSS" }),
  // Define the format of the message showing the timestamp, the level and the message and the log data
  winston.format.printf(
    (info) => {
      let session = info.session || {};
      return `${info.timestamp} ${info.level.toUpperCase().padEnd(5, " ")} [${(session.user || '')} ${(session.service || '')} ${session.transactionId || ''}] - ${JSON.stringify({ message: info.message, data: info.data? info.data: {}})}`
    }
  ),
);


const fileName = () => {
  let curDate = new Date();
  return `automation.log.${curDate.getFullYear()}-${curDate.getMonth()}-${curDate.getDate()}`;
};


//Create a file transport with daily rotate based on file size and file counts.
var rotateFileTransport = new winston.transports.DailyRotateFile({
  filename: 'logs/automation.log.%DATE%',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: false,
  maxSize: '100m',
  maxFiles: '1d'
});

rotateFileTransport.on('rotate', function(oldFilename, newFilename) {
  console.log('rotated');
});

/**
 * Define which transports the logger must use to print out messages.
 * In this example, we are using three different transports
 */
const transports = [
  // Allow the use the console to print the messages
  new winston.transports.Console(),

  /**
   * Allow to print all the error message inside the log file
   * rotating file transport is used here
   */
  rotateFileTransport,
];

/**
 * Create the logger instance that has to be exported
 * and used to log messages.
 */
const logger = winston.createLogger({
  level: level(),
  levels,
  format: format,
  transports,
});

module.exports = logger;
