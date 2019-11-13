"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.Conditional = exports.Type = void 0;var _conditional = require("./conditional");

const TYPE = "includes";exports.Type = TYPE;

class IncludesConditional extends _conditional.Conditional {

  parse(rules) {
    this.field = rules.field;
    this.value = rules.value;
  }

  isMatched(message) {
    const data = message[this.field];
    return data && data.includes(this.value);
  }}exports.Conditional = IncludesConditional;
