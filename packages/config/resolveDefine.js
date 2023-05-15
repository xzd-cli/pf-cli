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
Object.defineProperty(exports, "__esModule", { value: true });
function resolveDefine(opts) {
    var env = {};
    Object.keys(process.env).forEach(function (key) {
        if (key === 'NODE_ENV') {
            env[key] = process.env[key];
        }
    });
    Object.keys(env).forEach(function (key) {
        env[key] = JSON.stringify(env[key]);
    });
    var define = {};
    if (opts.define) {
        Object.keys(opts.define).forEach(function (key) {
            define[key] = JSON.stringify(opts.define[key]);
        });
    }
    return __assign({ 'process.env': env }, define);
}
exports.default = resolveDefine;
