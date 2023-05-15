"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var appDirectory = fs_1.default.realpathSync(process.cwd());
var resolveApp = function (relativePath) { return path_1.default.resolve(appDirectory, relativePath); };
exports.default = {
    appDist: resolveApp('dist'),
    appHtml: resolveApp('src/index.html'),
    appIndexJs: resolveApp('src/index.tsx'),
    appSrc: resolveApp('src'),
    appNodeModules: resolveApp('node_modules'),
    assets: resolveApp('src/assets'),
    appPkg: resolveApp('package.json'),
};
