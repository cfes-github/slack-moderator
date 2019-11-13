"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.Action = exports.Type = void 0;var _action = require("./action");

const TYPE = "notify";exports.Type = TYPE;

class NotifyAction extends _action.Action {
  parse(rule) {
    this.slackApi = this.context.slackApis[rule.user];
    this.channel = rule.channel;
    this.message = rule.message;
  }
  async performAction(context, message) {
    const msg = this.message.replace(/\$\{user\}/g, message.user || message.bot_id).replace(/\$\{channel\}/g, message.channel);
    await this.slackApi.sendMessage(this.channel, msg);
    context.logger.info({ to: message.user, rule: context.rule.name }, "Sending Message");
  }}exports.Action = NotifyAction;
