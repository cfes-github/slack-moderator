"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.Conditional = exports.Type = void 0;var _conditional = require("./conditional");

const TYPE = "and";exports.Type = TYPE;

class AndConditional extends _conditional.Conditional {

  parse(rules) {
    this.children = rules.rules.map(rule => this.parser.parse(rule));
  }

  isMatched(message) {
    return this.children.every(condition => condition.isMatched(message));
  }}exports.Conditional = AndConditional;