"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.Conditional = exports.Type = void 0;var _conditional = require("./conditional");
var _tokenizer = require("../../tokenizer");

const TYPE = "token-equals";exports.Type = TYPE;

class TokenEqualConditional extends _conditional.Conditional {

  parse(rules) {
    this.value = (0, _tokenizer.tokenize)(rules.value.toLowerCase()).join(" ");
    this.field = rules.field;
  }

  isMatched(message) {
    const tokens = (0, _tokenizer.cachedTokenize)(message, this.field);
    return tokens && tokens.some(token => token == this.value);
  }}exports.Conditional = TokenEqualConditional;