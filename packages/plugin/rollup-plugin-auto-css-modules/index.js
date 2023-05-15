"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("path");
var CSS_EXTNAMES = ['.css', '.less', '.sass', '.scss', '.stylus', '.styl'];
function autoCssModules() {
    return {
        visitor: {
            ImportDeclaration: function (path, _a) {
                var opts = _a.opts, filename = _a.filename;
                var _b = path.node, specifiers = _b.specifiers, value = _b.source.value;
                if (specifiers.length && CSS_EXTNAMES.includes((0, path_1.extname)(value))) {
                    var ctx = opts.ctx;
                    var cssFilename = (0, path_1.resolve)((0, path_1.dirname)(filename), value);
                    ctx.cssModules = __spreadArray(__spreadArray([], (ctx.cssModules || []), true), [cssFilename], false);
                }
            },
        },
    };
}
exports.default = autoCssModules;
