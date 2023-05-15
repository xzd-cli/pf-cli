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
var pify_1 = __importDefault(require("pify"));
var resolve_1 = __importDefault(require("resolve"));
var p_queue_1 = __importDefault(require("p-queue"));
var load_module_1 = require("./utils/load-module");
// This queue makes sure node-sass leaves one thread available for executing fs tasks
// See: https://github.com/sass/node-sass/issues/857
var threadPoolSize = process.env.UV_THREADPOOL_SIZE || 4;
var workQueue = new p_queue_1.default({ concurrency: threadPoolSize - 1 });
var moduleRe = /^~([a-z\d]|@).+/i;
var getUrlOfPartial = function (url) {
    var parsedUrl = path_1.default.parse(url);
    return "".concat(parsedUrl.dir).concat(path_1.default.sep, "_").concat(parsedUrl.base);
};
var resolvePromise = (0, pify_1.default)(resolve_1.default);
// List of supported SASS modules in the order of preference
var sassModuleIds = ['sass', 'node-sass'];
/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
exports.default = {
    name: 'sass',
    test: /\.(sass|scss)$/,
    process: function (_a) {
        var _this = this;
        var code = _a.code;
        return new Promise(function (resolve, reject) {
            var sass = loadSassOrThrow();
            var render = (0, pify_1.default)(sass.render.bind(sass));
            var data = _this.options.data || '';
            workQueue.add(function () {
                return render(__assign(__assign({}, _this.options), { file: _this.id, data: data + code, indentedSyntax: /\.sass$/.test(_this.id), sourceMap: _this.sourceMap, importer: [
                        function (url, importer, done) {
                            if (!moduleRe.test(url))
                                return done({ file: url });
                            var moduleUrl = url.slice(1);
                            var partialUrl = getUrlOfPartial(moduleUrl);
                            var options = {
                                basedir: path_1.default.dirname(importer),
                                extensions: ['.scss', '.sass', '.css'],
                            };
                            var finishImport = function (id) {
                                done({
                                    // Do not add `.css` extension in order to inline the file
                                    file: id.endsWith('.css') ? id.replace(/\.css$/, '') : id,
                                });
                            };
                            var next = function () {
                                // Catch all resolving errors, return the original file and pass responsibility back to other custom importers
                                done({ file: url });
                            };
                            // Give precedence to importing a partial
                            resolvePromise(partialUrl, options)
                                .then(finishImport)
                                .catch(function (error) {
                                if (error.code === 'MODULE_NOT_FOUND' || error.code === 'ENOENT') {
                                    resolvePromise(moduleUrl, options)
                                        .then(finishImport)
                                        .catch(next);
                                }
                                else {
                                    next();
                                }
                            });
                        },
                    ].concat(_this.options.importer || []) }))
                    .then(function (result) {
                    for (var _i = 0, _a = result.stats.includedFiles; _i < _a.length; _i++) {
                        var file = _a[_i];
                        _this.dependencies.add(file);
                    }
                    resolve({
                        code: result.css.toString(),
                        map: result.map && result.map.toString(),
                    });
                })
                    .catch(reject);
            });
        });
    },
};
function loadSassOrThrow() {
    // Loading one of the supported modules
    for (var _i = 0, sassModuleIds_1 = sassModuleIds; _i < sassModuleIds_1.length; _i++) {
        var moduleId = sassModuleIds_1[_i];
        var module_1 = (0, load_module_1.loadModule)(moduleId);
        if (module_1) {
            return module_1;
        }
    }
    // Throwing exception if module can't be loaded
    throw new Error("You need to install one of the following packages: ".concat(sassModuleIds
        .map(function (moduleId) { return "\"".concat(moduleId, "\""); })
        .join(', '), " in order to process SASS files"));
}
