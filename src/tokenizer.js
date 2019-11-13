"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.tokenize = tokenize;exports.cachedTokenize = cachedTokenize;var _natural = _interopRequireDefault(require("natural"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

function tokenize(value) {
  return value.
  toLowerCase().
  split(" ").
  mapFilter(token => token.replace(/^[^a-z0-9-!@<]+/, "")).
  map(token => _natural.default.PorterStemmer.stem(token));
}

function cachedTokenize(message, field) {
  let tokensContainer = message.tokens;
  if (!tokensContainer) {
    tokensContainer = message.tokens = {};
  }

  let tokens = tokensContainer[field];
  if (!tokens) {
    const value = message[field];
    if (value) {
      tokens = tokensContainer[field] = tokenize(value);
    }
  }

  return tokens;
}