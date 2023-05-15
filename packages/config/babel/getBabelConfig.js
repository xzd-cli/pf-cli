"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var resolvePlugin_1 = __importDefault(require("./resolvePlugin"));
function getBabelConfig(isEnvDevelopment) {
    if (isEnvDevelopment === void 0) { isEnvDevelopment = false; }
    var plugins = [
        ['babel-plugin-import', { libraryName: 'antd', libraryDirectory: 'lib', style: true }, 'antd'],
        '@babel/plugin-syntax-dynamic-import',
        '@rea-scripts/plugin/auto-css-modules',
        process.env.REACT_REFERSH !== 'none' && isEnvDevelopment && require.resolve('react-refresh/babel'),
        '@babel/plugin-proposal-export-default-from',
        '@babel/plugin-proposal-export-namespace-from',
        '@babel/plugin-proposal-do-expressions',
        '@babel/plugin-proposal-nullish-coalescing-operator',
        '@babel/plugin-proposal-optional-chaining',
        'babel-plugin-lodash',
        ['@babel/plugin-proposal-decorators', { legacy: true }],
        ['@babel/plugin-proposal-class-properties', {}],
    ];
    return {
        presets: (0, resolvePlugin_1.default)([
            [
                '@babel/preset-env',
                {
                    modules: false,
                    useBuiltIns: 'entry',
                    corejs: 3,
                },
            ],
            '@babel/preset-typescript',
            '@babel/preset-react',
        ]),
        plugins: (0, resolvePlugin_1.default)(plugins),
        cacheDirectory: true,
    };
}
exports.default = getBabelConfig;
