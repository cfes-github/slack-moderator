"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.Conditional = exports.Type = void 0;var _conditional = require("./conditional");

const TYPE = "equal";exports.Type = TYPE;

class EqualConditional extends _conditional.Conditional {

  parse(rules) {
    this.field = rules.field;
    this.value = rules.value;
    this.isNull = rules.null;
  }

  isMatched(message) {
    const data = message[this.field];
    if (this.isNull != null) {
      return this.isNull ? !data : data;
    }
    return data && message[this.field] == this.value;
  }}exports.Conditional = EqualConditional;