"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var slate_1 = require("slate");
var State = require('@menubar/markup-it').State;
var markdown = require('@menubar/markup-it/lib/markdown');
var state = State.create(markdown);
exports.importMarkdown = function (text) { return slate_1.Value.fromJSON({
    document: state.deserializeToDocument(text)
}); };
exports.exportMarkdown = function (value) { return state.serializeDocument(value.document); };
exports.deserializeJSON = function (json) { return json && typeof json === 'string' ?
    slate_1.Value.fromJSON(JSON.parse(json)) : {}; };
exports.serializeValue = function (value) { return JSON.stringify(value.toJSON(), null, '\n'); };
exports.saveValue = function (value) { return window.localStorage.setItem('value', exports.serializeValue(value)); };
exports.loadValue = function () { return exports.deserializeJSON(window.localStorage.getItem('value')); };
exports.getDepth = function (change) { return change.value.document.getDepth(change.value.startBlock.key); };
exports.getClosest = function (change) { return change.value.document
    .getClosestBlock(change.value.startBlock.key); };
exports.getParent = function (change) { return change.value.document.getParent(change.value.startBlock.key); };
exports.getPrevious = function (change) { return exports.getParent(change)
    .getPreviousSibling(change.value.startBlock.key); };
exports.clear = function (change) {
    change
        .extendToStartOf(change.value.startBlock)
        .delete();
};
//# sourceMappingURL=util.js.map