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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var promise_series_1 = __importDefault(require("promise.series"));
var postcss_loader_1 = __importDefault(require("./postcss-loader"));
var sass_loader_1 = __importDefault(require("./sass-loader"));
var stylus_loader_1 = __importDefault(require("./stylus-loader"));
var less_loader_1 = __importDefault(require("./less-loader"));
var matchFile = function (filepath, condition) {
    if (typeof condition === 'function') {
        return condition(filepath);
    }
    return condition && condition.test(filepath);
};
var Loaders = /** @class */ (function () {
    function Loaders(options) {
        if (options === void 0) { options = {}; }
        var _this = this;
        this.use = options.use.map(function (rule) {
            if (typeof rule === 'string') {
                return [rule];
            }
            if (Array.isArray(rule)) {
                return rule;
            }
            throw new TypeError('The rule in `use` option must be string or Array!');
        });
        this.loaders = [];
        var extensions = options.extensions || ['.css', '.sss', '.pcss'];
        var customPostcssLoader = __assign(__assign({}, postcss_loader_1.default), { test: function (filepath) { return extensions.some(function (ext) { return path_1.default.extname(filepath) === ext; }); } });
        this.registerLoader(customPostcssLoader);
        this.registerLoader(sass_loader_1.default);
        this.registerLoader(stylus_loader_1.default);
        this.registerLoader(less_loader_1.default);
        if (options.loaders) {
            options.loaders.forEach(function (loader) { return _this.registerLoader(loader); });
        }
    }
    Loaders.prototype.registerLoader = function (loader) {
        var existing = this.getLoader(loader.name);
        if (existing) {
            this.removeLoader(loader.name);
        }
        this.loaders.push(loader);
        return this;
    };
    Loaders.prototype.removeLoader = function (name) {
        this.loaders = this.loaders.filter(function (loader) { return loader.name !== name; });
        return this;
    };
    Loaders.prototype.isSupported = function (filepath) {
        return this.loaders.some(function (loader) {
            return matchFile(filepath, loader.test);
        });
    };
    /**
     * Process the resource with loaders in serial
     * @param {object} resource
     * @param {string} resource.code
     * @param {any} resource.map
     * @param {object} context
     * @param {string} context.id The absolute path to resource
     * @param {boolean | 'inline'} context.sourceMap
     * @param {Set<string>} context.dependencies A set of dependencies to watch
     * @returns {{code: string, map?: any}}
     */
    Loaders.prototype.process = function (_a, context) {
        var _this = this;
        var code = _a.code, map = _a.map;
        return (0, promise_series_1.default)(this.use
            .slice()
            .reverse()
            .map(function (_a) {
            var name = _a[0], options = _a[1];
            var loader = _this.getLoader(name);
            var loaderContext = __assign({ options: options || {} }, context);
            return function (v) {
                if (loader.alwaysProcess || matchFile(loaderContext.id, loader.test)) {
                    return loader.process.call(loaderContext, v);
                }
                // Otherwise directly return input value
                return v;
            };
        }), { code: code, map: map });
    };
    Loaders.prototype.getLoader = function (name) {
        return this.loaders.find(function (loader) { return loader.name === name; });
    };
    return Loaders;
}());
exports.default = Loaders;
