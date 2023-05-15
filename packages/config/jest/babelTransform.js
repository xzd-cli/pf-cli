"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var babel_jest_1 = __importDefault(require("babel-jest"));
var formatWinPath_1 = __importDefault(require("@rea-scripts/util/formatWinPath"));
var getBabelConfig_1 = __importDefault(require("../babel/getBabelConfig"));
var babelConfig = (0, getBabelConfig_1.default)();
babelConfig.presets = babelConfig.presets.map(function (preset) {
    if (Array.isArray(preset) && (0, formatWinPath_1.default)(preset[0]).indexOf('@babel/preset-env') > -1) {
        return [
            preset[0],
            {
                targets: {
                    node: 'current',
                },
            },
        ];
    }
    return preset;
});
module.exports = babel_jest_1.default.createTransformer(babelConfig);
