"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.Conditional = exports.Type = void 0;var _conditional = require("./conditional");
const TYPE = "regex-match";exports.Type = TYPE;

class RegexMatchConditional extends _conditional.Conditional {

  parse(rules) {
    if (!rules.regex) {
      throw new Error("No regular expression defined in the rule");
    }
    this.regexp = new RegExp(rules.regex, rules.flags || "ig");
    this.field = rules.field;
  }

  isMatched(message) {
    const data = message[this.field];
    return data && this.regexp.test(data);
  }}exports.Conditional = RegexMatchConditional;