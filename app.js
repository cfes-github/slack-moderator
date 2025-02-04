#!/usr/bin/env node
"use strict";
require("native-injects");
var _yargs = _interopRequireDefault(require("yargs"));
var _http = _interopRequireDefault(require("http"));
var _src = require("./src");
var _path = _interopRequireDefault(require("path"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

const argv = _yargs.default.usage('Usage: $0 <command> [options]').
version(process.env.npm_package_version || "UNKNOWN").

option("environment", {
  description: 'The environment this is running in.' }).


option("port", {
  description: 'The port to bind to.',
  type: "number" }).


option("host", {
  description: 'The hostname to bind to.' }).


option("config", {
  description: 'The config file.' }).

option("rules-config", {
  description: 'The rules config file.' }).

option("verbose", {
  description: "More detailed logging",
  alias: "v",
  boolean: true }).


argv;


function startServer(app, context) {
  const config = context.config.server;

  const port = process.env.PORT || config.port;
  const host = process.env.HOST || config.host;

  app.set('port', port);
  app.set('host', host);

  const server = _http.default.createServer(app);

  server.listen(port, host);
  server.on('error', error => {
    if (error.syscall !== 'listen') {
      throw error;
    }

    if (error.code === "EACCES") {
      context.logger.error({ port, host }, "Requires elevated privileges");
      process.exit(1);
      return;
    } else if (error.code === "EADDRINUSE") {
      context.logger.error({ port, host }, "Address already in use");
      process.exit(1);
      return;
    }
    throw error;
  });
  server.on('listening', () => {
    context.logger.info({ port, host }, "Listening");
  });
}


function run(args) {

  const environment = args.environment || process.env.NODE_ENV || "development";

  const defaultConfigPath = _path.default.join(__dirname, "config");
  const configFile = args.config || _path.default.join(defaultConfigPath, environment);
  const config = require(configFile).default;
  config.server.host = args.host || config.server.host;
  config.server.port = args.port || config.server.port;
  config.logging.stdoutLevel = args.verbose ? "debug" : config.logging.stdoutLevel;


  const rulesFile = args.rulesConfig || _path.default.join(defaultConfigPath, config.rules || "rules");
  const rulesConfig = require(rulesFile).default;

  const { app, context } = (0, _src.createApp)(environment, config, rulesConfig);
  context.logger.debug({
    config: configFile,
    environment,
    host: config.server.host,
    port: config.server.port },
  "Starting");

  startServer(app, context);
}
run(argv);