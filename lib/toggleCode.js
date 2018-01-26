"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var onModEnter_1 = require("slate-edit-code/dist/handlers/onModEnter");
var plugins = require("./plugins");
var remove = function (change) { return change
    .removeNodeByKey(change.value.startBlock.key); };
var getParent = function (change) { return change.value.document.getParent(change.value.startBlock.key); };
var isInCodeBlock = function (change) { return change.value.document.getClosest(change.value.startKey, function (block) { return block.type === 'code_block'; }); };
function toggleCode(event, change, onChange, syntax) {
    if (syntax === void 0) { syntax = 'language-js'; }
    if (!isInCodeBlock(change)) {
        event.preventDefault();
        change
            .extendToStartOf(change.value.startBlock)
            .delete();
        onChange(plugins.editCode
            .changes.toggleCodeBlock(change, "paragraph").focus());
        var parentNode = getParent(change);
        change.setNodeByKey(parentNode.key, { data: { syntax: syntax } });
    }
    else {
        remove(change);
        onModEnter_1.default(plugins.editCodeOptions, event, change, {});
    }
    return true;
}
;
exports.default = toggleCode;
//# sourceMappingURL=toggleCode.js.map