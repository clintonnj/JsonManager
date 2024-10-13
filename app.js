var express = require("express"),
    cors = require("cors"),
    bodyParser = require("body-parser")
const config = require("./config/index");
const logger = require("./logger/index");
const configRouter = require('./routes/config');
const crypto = require("crypto");

var port = config.port;
var app = express();
app.use(cors({
  origin: JSON.parse(config.originsAllowed),
  optionsSuccessStatus: 200,
  credentials: true
}));
app.use(bodyParser.urlencoded({ extended: false }), bodyParser.json());
app.use(function(req, res, next) {
  const transactionId = crypto.randomUUID();
  let appSession = {transactionId: transactionId }
  req['appSession'] = appSession;
  next();
});

app.use('/api', configRouter);
/**
 * Start listening on the given port
 */
var server = app.listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;
  logger.info({message: `App listening at http://${host}:${port}`});
});

server.on("error", function (e) {
  logger.error({message: `An error occured: ${e.message}`});
});
