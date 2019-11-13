"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.Conditional = exports.Type = void 0;var _conditional = require("./conditional");

const TYPE = "disabled";exports.Type = TYPE;

class DisabledConditional extends _conditional.Conditional {
  parse() {
    //ignore
  }
  isMatched() {
    return false;
  }}exports.Conditional = DisabledConditional;