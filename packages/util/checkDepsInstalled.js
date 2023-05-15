"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 检测是否安装依赖
 */
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
function checkDepsInstalled(projectDirectory) {
    try {
        fs_1.default.statSync(path_1.default.resolve(projectDirectory, 'node_modules'));
        return true;
    }
    catch (err) {
        return false;
    }
}
exports.default = checkDepsInstalled;
