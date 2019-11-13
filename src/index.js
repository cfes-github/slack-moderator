"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;var _express = _interopRequireDefault(require("express"));
var _cookieParser = _interopRequireDefault(require("cookie-parser"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _index = _interopRequireDefault(require("./routes/index"));
var _rules = require("./rules");
var _logging = require("./logging");
var _resources = require("./resources");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

function createApp(environment, config, rulesConfig) {
  const app = (0, _express.default)();

  const logger = (0, _logging.registerLogger)(app, config);

  const context = {
    logger,
    config,
    rulesConfig,
    resources: (0, _resources.loadResources)() };


  context.rules = new _rules.Rules(context, rulesConfig);

  app.use((request, response, next) => {
    Object.entries(context).forEach(([key, value]) => {
      if (!request[key]) {
        request[key] = value;
      }
    });
    return next();
  });

  app.use(_bodyParser.default.json());
  app.use(_bodyParser.default.urlencoded({ extended: false }));
  app.use((0, _cookieParser.default)());


  app.use('/', _index.default);

  // catch 404 and forward to error handler
  app.use(function (req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  app.use(function (err, req, res, next) {//eslint-disable-line
    res.error = err;
    res.status(err.status || 500).send({
      message: err.message,
      error: environment === 'development' ? err : {} });

  });


  logger.info("Started...");

  return { app, context };
}