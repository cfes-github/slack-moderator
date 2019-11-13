"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.Rules = void 0;
var _fs = _interopRequireDefault(require("fs"));
var _path = _interopRequireDefault(require("path"));
var _slackApi = require("../slack-api");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};var ownKeys = Object.keys(source);if (typeof Object.getOwnPropertySymbols === 'function') {ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {return Object.getOwnPropertyDescriptor(source, sym).enumerable;}));}ownKeys.forEach(function (key) {_defineProperty(target, key, source[key]);});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

function importAllToMap(rootPath, field) {
  const list = _fs.default.readdirSync(rootPath);
  return list.mapFilter(fileName => {
    const required = require(_path.default.join(rootPath, fileName));
    if (!required.Type) {
      return;
    }
    return {
      type: required.Type,
      require: required[field] };

  }).toIdMap("type", "require");
}


const TYPE_TO_CONDITIONAL = importAllToMap(_path.default.join(__dirname, "./conditionals"), "Conditional");
const TYPE_TO_ACTION = importAllToMap(_path.default.join(__dirname, "./actions"), "Action");


class ActionParser {

  constructor(context) {
    this.context = context;
  }

  parse(rule) {
    const type = TYPE_TO_ACTION[rule.type];
    if (!type) {
      throw new Error("Action type unknown: " + rule.type);
    }

    const action = new type(this.context, this);
    action.parse(rule);
    return action;
  }

  parseRulesMap(rules) {
    return Object.entries(rules).map(([name, value]) => ({
      name,
      value: this.parse(value) })).
    toIdMap("name", "value");
  }}


class RuleParser {
  constructor(context) {
    this.context = context;
  }

  parse(rule) {
    const type = TYPE_TO_CONDITIONAL[rule.type];
    if (!type) {
      throw new Error("No conditional found for " + rule.type);
    }

    const condition = new type(this.context, this);
    condition.parse(rule);
    return condition;
  }}



class Rules {
  constructor(context, rules) {
    const parser = new RuleParser(context);

    const slackApis = Object.keys(rules.users).
    toIdMap(user => user, user => new _slackApi.SlackApi(context, rules.users[user].token));

    context.slackApis = slackApis;

    const actions = new ActionParser(context);
    const actionsMap = actions.parseRulesMap(rules.actions);

    this.checks = Object.entries(rules.rules).map(([name, rule]) => {
      return {
        name,
        description: rule.description,
        if: parser.parse(rule.if),
        actions: rule.actions.map(action => actionsMap[action]) };

    });

  }

  async processMessage(context, message) {
    message.event.text = JSON.parse(JSON.stringify(message.event.text, function(a, b) {
	return typeof b === "string" ? b.toLowerCase() : b
    }));
    const event = message.event;
    const matches = this.checks.filter(check => check.if.isMatched(event));
    if (!matches.isEmpty) {
      await matches.forEachConcurrent(async match => {
        const currentContext = _objectSpread({
          rule: match },
        context);

        await match.actions.forEachPromise(async action => {
          await action.performAction(currentContext, event);
        });
      });
    }
  }}exports.Rules = Rules;
