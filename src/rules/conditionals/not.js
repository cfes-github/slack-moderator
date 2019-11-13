"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.Conditional = exports.Type = void 0;var _conditional = require("./conditional");

const TYPE = "not";exports.Type = TYPE;

class NotConditional extends _conditional.Conditional {

  parse(rules) {
    this.childRule = this.parser.parse(rules.rule);
  }

  isMatched(message) {
    return !this.childRule.isMatched(message);
  }}exports.Conditional = NotConditional;