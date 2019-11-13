"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.loadResources = loadResources;var _path = _interopRequireDefault(require("path"));
var _fs = _interopRequireDefault(require("fs"));
var _tokenizer = require("./tokenizer");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

function loadResources(rootPath) {
  rootPath = rootPath || _path.default.join(__dirname, "../resources");

  const list = _fs.default.readdirSync(rootPath);
  return list.mapFilter(fileName => {
    const data = _fs.default.readFileSync(_path.default.join(rootPath, fileName));
    const lines = data.toString().split("\n").filterMap(line => (0, _tokenizer.tokenize)(line), words => !words.isEmpty);
    const maxWordCount = lines.maxValue(words => words.length);
    const words = lines.map(line => line.join(" "));
    return {
      file: _path.default.basename(fileName).toLowerCase(),
      contents: {
        words: new Set(words),
        maxWordCount } };


  }).toIdMap("file", "contents");
}