"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/config/jest/fileTransform.js
var path_1 = __importDefault(require("path"));
var camelcase_1 = __importDefault(require("camelcase"));
module.exports = {
    process: function (src, filename) {
        var assetFilename = JSON.stringify(path_1.default.basename(filename));
        if (filename.match(/\.svg$/)) {
            var pascalCaseFileName = (0, camelcase_1.default)(path_1.default.parse(filename).name, {
                pascalCase: true,
            });
            var componentName = "Svg".concat(pascalCaseFileName);
            return "const React = require('react');\n      module.exports = {\n        __esModule: true,\n        default: ".concat(assetFilename, ",\n        ReactComponent: React.forwardRef(function ").concat(componentName, "(props, ref) {\n          return {\n            $$typeof: Symbol.for('react.element'),\n            type: 'svg',\n            ref: ref,\n            key: null,\n            props: Object.assign({}, props, {\n              children: ").concat(assetFilename, "\n            })\n          };\n        }),\n      };");
        }
        return "module.exports = ".concat(assetFilename, ";");
    },
};
