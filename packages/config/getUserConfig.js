"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserConfigPath = exports.getExistFile = exports.CONFIG_FILES = void 0;
var fs_1 = require("fs");
var path_1 = require("path");
exports.CONFIG_FILES = ['.ols.config.js', '.ols.config.jsx', '.ols.config.ts', '.ols.config.tsx'];
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
function getUserConfigPath(cwd) {
    if (cwd === void 0) { cwd = process.cwd(); }
    var configFile = getExistFile({
        cwd: cwd,
        files: exports.CONFIG_FILES,
    });
    return configFile;
}
exports.getUserConfigPath = getUserConfigPath;
function getUserConfig() {
    var userConfig;
    try {
        userConfig = require(getUserConfigPath());
    }
    catch (error) {
        userConfig = {};
    }
    return userConfig;
}
exports.default = getUserConfig;
