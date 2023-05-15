"use strict";
/**
 * 开启dll
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var autodll_webpack_plugin_1 = __importDefault(require("autodll-webpack-plugin"));
module.exports = {
    name: 'auto-dll',
    fn: function (_a) {
        var context = _a.context, configureWebpack = _a.configureWebpack;
        var command = context.command;
        if (command === 'dev') {
            configureWebpack(function (config, merge) {
                return merge(config, {
                    plugins: [
                        new autodll_webpack_plugin_1.default({
                            inject: true,
                            filename: '[name]_[hash].js',
                            entry: {
                                dll: ['react', 'react-dom'],
                            },
                            config: {
                                mode: 'development',
                            },
                        }),
                    ],
                });
            });
        }
    },
};
