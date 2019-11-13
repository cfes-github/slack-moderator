"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.Action = exports.Type = void 0;var _action = require("./action");

const TYPE = "delete-message";exports.Type = TYPE;

class DeleteMessageAction extends _action.Action {
  parse(rule) {
    this.slackApi = this.context.slackApis[rule.user];
  }
  async performAction(context, message) {
    try {
      if (!message.ts || !message.channel || !message.user) {
        context.logger.warn({
          to: message.user,
          botId: message.bot_id,
          rule: context.rule.name,
          channel: message.channel,
          ts: message.ts },
        "Cant delete message that doesn't exist.");
        return;
      }
      await this.slackApi.deleteMessage(message.channel, message.ts);
      context.logger.info({ to: message.user, rule: context.rule.name }, "Deleted Message");
    } catch (err) {
      context.logger.error({ err, to: message.user, rule: context.rule.name }, "Cant delete message.");
    }

  }}exports.Action = DeleteMessageAction;