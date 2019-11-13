"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.Conditional = exports.Type = void 0;var _conditional = require("./conditional");
var _tokenizer = require("../../tokenizer");
const TYPE = "tokens-in";exports.Type = TYPE;

class TokensInConditional extends _conditional.Conditional {

  parse(rules) {
    const { maxWordCount, words } = this.context.resources[rules.list.toLowerCase()];
    this.list = words;
    this.maxWordCount = maxWordCount;
    this.field = rules.field;
  }

  isMatched(message) {
    const tokens = (0, _tokenizer.cachedTokenize)(message, this.field);
    if (!tokens) {
      return;
    }

    for (let i = 0; i < tokens.length; i++) {
      const stop = Math.max(i - this.maxWordCount, 0);
      for (let j = i; j >= stop; j--) {
        const words = tokens.slice(j, i + 1).join(" ");
        if (this.list.has(words)) {
          return true;
        }
      }
    }
    return false;
  }}exports.Conditional = TokensInConditional;