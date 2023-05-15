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
function resolvePlugin(plugins) {
    return plugins.filter(Boolean).map(function (plugin) {
        if (Array.isArray(plugin)) {
            var pluginName = plugin[0], args = plugin.slice(1);
            return __spreadArray([require.resolve(pluginName)], args, true);
        }
        return require.resolve(plugin);
    });
}
exports.default = resolvePlugin;
