"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.Action = void 0;
class Action {
  constructor(context, parser) {
    this.parser = parser;
    this.context = context;
  }
  parse() {
    throw new Error("Not implemented");
  }
  async performAction() {
    throw new Error("Not implemented");
  }}exports.Action = Action;