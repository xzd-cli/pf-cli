"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("path");
var CSS_EXTNAMES = ['.css', '.less', '.sass', '.scss', '.stylus', '.styl'];
function autoCssModules() {
    return {
        visitor: {
            ImportDeclaration: function (path, _a) {
                var opts = _a.opts;
                var _b = path.node, specifiers = _b.specifiers, source = _b.source, value = _b.source.value;
                if (specifiers.length && CSS_EXTNAMES.includes((0, path_1.extname)(value))) {
                    source.value = "".concat(value, "?").concat(opts.flag || 'css_modules');
                }
            },
        },
    };
}
exports.default = autoCssModules;
