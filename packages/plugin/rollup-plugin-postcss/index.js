"use strict";
/**
 * fork from https://github.com/egoist/rollup-plugin-postcss/blob/master/src/index.js
 * 通过修改部分代码，解决自动css modules问题
 */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var rollup_pluginutils_1 = require("rollup-pluginutils");
var concat_with_sourcemaps_1 = __importDefault(require("concat-with-sourcemaps"));
var loaders_1 = __importDefault(require("./loaders"));
var normalize_path_1 = __importDefault(require("./utils/normalize-path"));
/**
 * The options that could be `boolean` or `object`
 * We convert it to an object when it's truthy
 * Otherwise fallback to default value
 */
function inferOption(option, defaultValue) {
    if (option === false)
        return false;
    if (option && typeof option === 'object')
        return option;
    return option ? {} : defaultValue;
}
/**
 * Recursively get the correct import order from rollup
 * We only process a file once
 *
 * @param {string} id
 * @param {Function} getModuleInfo
 * @param {Set<string>} seen
 */
function getRecursiveImportOrder(id, getModuleInfo, seen) {
    if (seen === void 0) { seen = new Set(); }
    if (seen.has(id)) {
        return [];
    }
    seen.add(id);
    var result = [id];
    getModuleInfo(id).importedIds.forEach(function (importFile) {
        result.push.apply(result, getRecursiveImportOrder(importFile, getModuleInfo, seen));
    });
    return result;
}
/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
exports.default = (function (options) {
    if (options === void 0) { options = {}; }
    var filter = (0, rollup_pluginutils_1.createFilter)(options.include, options.exclude);
    var postcssPlugins = Array.isArray(options.plugins)
        ? options.plugins.filter(Boolean)
        : options.plugins;
    var sourceMap = options.sourceMap;
    var postcssLoaderOptions = {
        /** Inject CSS as `<style>` to `<head>` */
        inject: typeof options.inject === 'function' ? options.inject : inferOption(options.inject, {}),
        /** Extract CSS */
        extract: typeof options.extract === 'undefined' ? false : options.extract,
        /** CSS modules */
        onlyModules: options.modules === true,
        modules: inferOption(options.modules, false),
        namedExports: options.namedExports,
        /** Automatically CSS modules for .module.xxx files */
        autoModules: options.autoModules,
        /** Options for cssnano */
        minimize: inferOption(options.minimize, false),
        /** Postcss config file */
        config: inferOption(options.config, {}),
        /** PostCSS target filename hint, for plugins that are relying on it */
        to: options.to,
        /** PostCSS options */
        postcss: {
            parser: options.parser,
            plugins: postcssPlugins,
            syntax: options.syntax,
            stringifier: options.stringifier,
            exec: options.exec,
        },
        ctx: options.ctx,
    };
    var use = ['sass', 'stylus', 'less'];
    if (Array.isArray(options.use)) {
        use = options.use;
    }
    else if (options.use !== null && typeof options.use === 'object') {
        use = [
            ['sass', options.use.sass || {}],
            ['stylus', options.use.stylus || {}],
            ['less', options.use.less || {}],
        ];
    }
    use.unshift(['postcss', postcssLoaderOptions]);
    var loaders = new loaders_1.default({
        use: use,
        loaders: options.loaders,
        extensions: options.extensions,
    });
    var extracted = new Map();
    return {
        name: 'postcss',
        transform: function (code, id) {
            return __awaiter(this, void 0, void 0, function () {
                var loaderContext, result, _i, _a, dep;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!filter(id) || !loaders.isSupported(id)) {
                                return [2 /*return*/, null];
                            }
                            if (typeof options.onImport === 'function') {
                                options.onImport(id);
                            }
                            loaderContext = {
                                id: id,
                                sourceMap: sourceMap,
                                dependencies: new Set(),
                                warn: this.warn.bind(this),
                                plugin: this,
                            };
                            return [4 /*yield*/, loaders.process({
                                    code: code,
                                    map: undefined,
                                }, loaderContext)
                                // eslint-disable-next-line no-restricted-syntax
                            ];
                        case 1:
                            result = _b.sent();
                            // eslint-disable-next-line no-restricted-syntax
                            for (_i = 0, _a = loaderContext.dependencies; _i < _a.length; _i++) {
                                dep = _a[_i];
                                this.addWatchFile(dep);
                            }
                            if (postcssLoaderOptions.extract) {
                                extracted.set(id, result.extracted);
                                return [2 /*return*/, {
                                        code: result.code,
                                        map: { mappings: '' },
                                    }];
                            }
                            return [2 /*return*/, {
                                    code: result.code,
                                    map: result.map || { mappings: '' },
                                }];
                    }
                });
            });
        },
        augmentChunkHash: function () {
            if (extracted.size === 0)
                return;
            // eslint-disable-next-line unicorn/no-reduce
            var extractedValue = __spreadArray([], extracted, true).reduce(function (object, _a) {
                var _b;
                var key = _a[0], value = _a[1];
                return (__assign(__assign({}, object), (_b = {}, _b[key] = value, _b)));
            }, {});
            return JSON.stringify(extractedValue);
        },
        generateBundle: function (options_, bundle) {
            return __awaiter(this, void 0, void 0, function () {
                var dir, file, getExtracted, shouldExtract, _a, code, codeFileName, map, mapFileName, cssOptions, result;
                var _this = this;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (extracted.size === 0 || !(options_.dir || options_.file))
                                return [2 /*return*/];
                            dir = options_.dir || path_1.default.dirname(options_.file);
                            file = options_.file ||
                                path_1.default.join(options_.dir, Object.keys(bundle).find(function (fileName) { return bundle[fileName].isEntry; }));
                            getExtracted = function () {
                                var fileName = "".concat(path_1.default.basename(file, path_1.default.extname(file)), ".css");
                                if (typeof postcssLoaderOptions.extract === 'string') {
                                    fileName = path_1.default.isAbsolute(postcssLoaderOptions.extract)
                                        ? (0, normalize_path_1.default)(path_1.default.relative(dir, postcssLoaderOptions.extract))
                                        : (0, normalize_path_1.default)(postcssLoaderOptions.extract);
                                }
                                var concat = new concat_with_sourcemaps_1.default(true, fileName, '\n');
                                var entries = Array.from(extracted.values());
                                var _a = bundle[(0, normalize_path_1.default)(path_1.default.relative(dir, file))], modules = _a.modules, facadeModuleId = _a.facadeModuleId;
                                if (modules) {
                                    var moduleIds_1 = getRecursiveImportOrder(facadeModuleId, _this.getModuleInfo);
                                    entries.sort(function (a, b) { return moduleIds_1.indexOf(a.id) - moduleIds_1.indexOf(b.id); });
                                }
                                for (var _i = 0, entries_1 = entries; _i < entries_1.length; _i++) {
                                    var result = entries_1[_i];
                                    var relative = (0, normalize_path_1.default)(path_1.default.relative(dir, result.id));
                                    var map_1 = result.map || null;
                                    if (map_1) {
                                        map_1.file = fileName;
                                    }
                                    concat.add(relative, result.code, map_1);
                                }
                                var code = concat.content;
                                if (sourceMap === 'inline') {
                                    code += "\n/*# sourceMappingURL=data:application/json;base64,".concat(Buffer.from(concat.sourceMap, 'utf8').toString('base64'), "*/");
                                }
                                else if (sourceMap === true) {
                                    code += "\n/*# sourceMappingURL=".concat(path_1.default.basename(fileName), ".map */");
                                }
                                return {
                                    code: code,
                                    map: sourceMap === true && concat.sourceMap,
                                    codeFileName: fileName,
                                    mapFileName: "".concat(fileName, ".map"),
                                };
                            };
                            if (!options.onExtract) return [3 /*break*/, 2];
                            return [4 /*yield*/, options.onExtract(getExtracted)];
                        case 1:
                            shouldExtract = _b.sent();
                            if (shouldExtract === false) {
                                return [2 /*return*/];
                            }
                            _b.label = 2;
                        case 2:
                            _a = getExtracted(), code = _a.code, codeFileName = _a.codeFileName, map = _a.map, mapFileName = _a.mapFileName;
                            if (!postcssLoaderOptions.minimize) return [3 /*break*/, 4];
                            cssOptions = {};
                            cssOptions.from = codeFileName;
                            if (sourceMap === 'inline') {
                                cssOptions.map = { inline: true };
                            }
                            else if (sourceMap === true && map) {
                                cssOptions.map = { prev: map };
                                cssOptions.to = codeFileName;
                            }
                            return [4 /*yield*/, require('cssnano')(postcssLoaderOptions.minimize).process(code, cssOptions)];
                        case 3:
                            result = _b.sent();
                            code = result.css;
                            if (sourceMap === true && result.map && result.map.toString) {
                                map = result.map.toString();
                            }
                            _b.label = 4;
                        case 4:
                            this.emitFile({
                                fileName: codeFileName,
                                type: 'asset',
                                source: code,
                            });
                            if (map) {
                                this.emitFile({
                                    fileName: mapFileName,
                                    type: 'asset',
                                    source: map,
                                });
                            }
                            return [2 /*return*/];
                    }
                });
            });
        },
    };
});
