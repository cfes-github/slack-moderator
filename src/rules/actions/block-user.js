"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.Action = exports.Type = void 0;var _action = require("./action");

const TYPE = "block-user";exports.Type = TYPE;

class BlockUserAction extends _action.Action {
  parse(rule) {
    this.slackApi = this.context.slackApis[rule.user];
  }
  async performAction(context, message) {
    await this.slackApi.blockUser(message.user);
    context.logger.info({ to: message.user, rule: context.rule.name }, "Blocked user");
  }}exports.Action = BlockUserAction;