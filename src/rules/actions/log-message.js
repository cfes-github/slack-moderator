"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.Action = exports.Type = void 0;var _action = require("./action");

const TYPE = "log-message";exports.Type = TYPE;

class LogMessageAction extends _action.Action {
  parse(rule) {
    this.message = rule.message || "Logging Message";
  }
  async performAction(context, message) {
    context.logger.info({ message: message, rule: context.rule.name }, this.message);
  }}exports.Action = LogMessageAction;