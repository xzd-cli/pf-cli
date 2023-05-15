"use strict";
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
var import_cwd_1 = __importDefault(require("import-cwd"));
var postcss_1 = __importDefault(require("postcss"));
var postcss_load_config_1 = __importDefault(require("postcss-load-config"));
var safe_identifier_1 = require("safe-identifier");
var humanlize_path_1 = __importDefault(require("./utils/humanlize-path"));
var normalize_path_1 = __importDefault(require("./utils/normalize-path"));
var styleInjectPath = require.resolve('style-inject/dist/style-inject.es').replace(/[\\/]+/g, '/');
function loadConfig(id, _a) {
    var configOptions = _a.ctx, configPath = _a.path;
    var handleError = function (err) {
        if (!err.message.includes('No PostCSS Config found')) {
            throw err;
        }
        // Return empty options for PostCSS
        return {};
    };
    configPath = configPath ? path_1.default.resolve(configPath) : path_1.default.dirname(id);
    var ctx = {
        file: {
            extname: path_1.default.extname(id),
            dirname: path_1.default.dirname(id),
            basename: path_1.default.basename(id),
        },
        options: configOptions || {},
    };
    return (0, postcss_load_config_1.default)(ctx, configPath).catch(handleError);
}
function escapeClassNameDashes(string) {
    return string.replace(/-+/g, function (match) {
        return "$".concat(match.replace(/-/g, '_'), "$");
    });
}
function ensureClassName(name) {
    name = escapeClassNameDashes(name);
    return (0, safe_identifier_1.identifier)(name, false);
}
function ensurePostCSSOption(option) {
    return typeof option === 'string' ? (0, import_cwd_1.default)(option) : option;
}
function isModuleFile(file, cacheCssModules) {
    // return /\.module\.[a-z]{2,6}$/.test(file)
    return cacheCssModules === null || cacheCssModules === void 0 ? void 0 : cacheCssModules.includes(file);
}
/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
exports.default = {
    name: 'postcss',
    alwaysProcess: true,
    // `test` option is dynamically set in ./loaders
    // eslint-disable-next-line complexity
    process: function (_a) {
        var code = _a.code, map = _a.map;
        return __awaiter(this, void 0, void 0, function () {
            var config, _b, options, cacheCssModules, plugins, shouldExtract, shouldInject, modulesExported, autoModules, isAutoModule, supportModules, postcssOptions, noopPlugin, result, _i, _c, message, _d, _e, warning, outputMap, output, extracted, json, getClassName, name_1, newName, cssVariableName, module_1;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        if (!this.options.config) return [3 /*break*/, 2];
                        return [4 /*yield*/, loadConfig(this.id, this.options.config)];
                    case 1:
                        _b = _f.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _b = {};
                        _f.label = 3;
                    case 3:
                        config = _b;
                        options = this.options;
                        cacheCssModules = options.ctx.cssModules;
                        plugins = __spreadArray(__spreadArray([], (options.postcss.plugins || []), true), (config.plugins || []), true);
                        shouldExtract = options.extract;
                        shouldInject = options.inject;
                        modulesExported = {};
                        autoModules = options.autoModules !== false && options.onlyModules !== true;
                        isAutoModule = autoModules && isModuleFile(this.id, cacheCssModules);
                        supportModules = autoModules ? isAutoModule : options.modules;
                        if (supportModules) {
                            plugins.unshift(require('postcss-modules')(__assign(__assign({ 
                                // In tests
                                // Skip hash in names since css content on windows and linux would differ because of `new line` (\r?\n)
                                generateScopedName: process.env.ROLLUP_POSTCSS_TEST
                                    ? '[name]_[local]'
                                    : '[name]_[local]__[hash:base64:5]' }, options.modules), { getJSON: function (filepath, json, outpath) {
                                    modulesExported[filepath] = json;
                                    if (typeof options.modules === 'object' && typeof options.modules.getJSON === 'function') {
                                        return options.modules.getJSON(filepath, json, outpath);
                                    }
                                } })));
                        }
                        // If shouldExtract, minimize is done after all CSS are extracted to a file
                        if (!shouldExtract && options.minimize) {
                            plugins.push(require('cssnano')(options.minimize));
                        }
                        postcssOptions = __assign(__assign(__assign({}, this.options.postcss), config.options), { 
                            // Allow overriding `to` for some plugins that are relying on this value
                            to: options.to || this.id, 
                            // Followings are never modified by user config config
                            from: this.id, map: this.sourceMap
                                ? shouldExtract
                                    ? { inline: false, annotation: false }
                                    : { inline: true, annotation: false }
                                : false });
                        delete postcssOptions.plugins;
                        postcssOptions.parser = ensurePostCSSOption(postcssOptions.parser);
                        postcssOptions.syntax = ensurePostCSSOption(postcssOptions.syntax);
                        postcssOptions.stringifier = ensurePostCSSOption(postcssOptions.stringifier);
                        if (map && postcssOptions.map) {
                            postcssOptions.map.prev = typeof map === 'string' ? JSON.parse(map) : map;
                        }
                        if (plugins.length === 0) {
                            noopPlugin = function () {
                                return {
                                    postcssPlugin: 'postcss-noop-plugin',
                                    Once: function () { },
                                };
                            };
                            plugins.push(noopPlugin());
                        }
                        return [4 /*yield*/, (0, postcss_1.default)(plugins).process(code, postcssOptions)];
                    case 4:
                        result = _f.sent();
                        for (_i = 0, _c = result.messages; _i < _c.length; _i++) {
                            message = _c[_i];
                            if (message.type === 'dependency') {
                                this.dependencies.add(message.file);
                            }
                        }
                        for (_d = 0, _e = result.warnings(); _d < _e.length; _d++) {
                            warning = _e[_d];
                            if (!warning.message) {
                                ;
                                warning.message = warning.text;
                            }
                            this.warn(warning);
                        }
                        outputMap = result.map && JSON.parse(result.map.toString());
                        if (outputMap && outputMap.sources) {
                            outputMap.sources = outputMap.sources.map(function (v) { return (0, normalize_path_1.default)(v); });
                        }
                        output = '';
                        if (options.namedExports) {
                            json = modulesExported[this.id];
                            getClassName = typeof options.namedExports === 'function' ? options.namedExports : ensureClassName;
                            // eslint-disable-next-line guard-for-in
                            for (name_1 in json) {
                                newName = getClassName(name_1);
                                // Log transformed class names
                                // But skip this when namedExports is a function
                                // Since a user like you can manually log that if you want
                                if (name_1 !== newName && typeof options.namedExports !== 'function') {
                                    this.warn("Exported \"".concat(name_1, "\" as \"").concat(newName, "\" in ").concat((0, humanlize_path_1.default)(this.id)));
                                }
                                if (!json[newName]) {
                                    json[newName] = json[name_1];
                                }
                                output += "export var ".concat(newName, " = ").concat(JSON.stringify(json[name_1]), ";\n");
                            }
                        }
                        cssVariableName = (0, safe_identifier_1.identifier)('css', true);
                        if (shouldExtract) {
                            output += "export default ".concat(JSON.stringify(modulesExported[this.id]), ";");
                            extracted = {
                                id: this.id,
                                code: result.css,
                                map: outputMap,
                            };
                        }
                        else {
                            module_1 = supportModules ? JSON.stringify(modulesExported[this.id]) : cssVariableName;
                            output +=
                                "var ".concat(cssVariableName, " = ").concat(JSON.stringify(result.css), ";\n") +
                                    "export default ".concat(module_1, ";\n") +
                                    "export var stylesheet=".concat(JSON.stringify(result.css), ";");
                        }
                        if (!shouldExtract && shouldInject) {
                            output +=
                                typeof options.inject === 'function'
                                    ? options.inject(cssVariableName, this.id)
                                    : '\n' +
                                        "import styleInject from '".concat(styleInjectPath, "';\n") +
                                        "styleInject(".concat(cssVariableName).concat(Object.keys(options.inject).length > 0 ? ",".concat(JSON.stringify(options.inject)) : '', ");");
                        }
                        return [2 /*return*/, {
                                code: output,
                                map: outputMap,
                                extracted: extracted,
                            }];
                }
            });
        });
    },
};
