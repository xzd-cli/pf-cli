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
exports.getExistFile = exports.CONFIG_FILES = void 0;
var fs_1 = require("fs");
var path_1 = require("path");
exports.CONFIG_FILES = ['jest.config.js', 'jest.config.ts'];
function getExistFile(_a) {
    var cwd = _a.cwd, files = _a.files;
    // eslint-disable-next-line no-restricted-syntax
    for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
        var file = files_1[_i];
        var absFilePath = (0, path_1.join)(cwd, file);
        if ((0, fs_1.existsSync)(absFilePath)) {
            return absFilePath;
        }
    }
}
exports.getExistFile = getExistFile;
function getJestConfigPath(ctx) {
    var rootDir = ctx.rootDir, commandArgs = ctx.commandArgs;
    var configFile = getExistFile({
        cwd: rootDir,
        files: __spreadArray(__spreadArray([], exports.CONFIG_FILES, true), [commandArgs.config], false).filter(Boolean),
    });
    return configFile;
}
exports.default = getJestConfigPath;
