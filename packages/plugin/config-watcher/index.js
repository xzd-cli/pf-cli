"use strict";
/**
 * 监听.ols.config配置文件变更，重启应用
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chokidar_1 = __importDefault(require("chokidar"));
var server = null;
var watcher = null;
module.exports = {
    name: 'config-watcher',
    fn: function (_a) {
        var context = _a.context, onHook = _a.onHook, logger = _a.logger;
        var command = context.command, userConfigDir = context.userConfigDir;
        if (command === 'dev') {
            if (!watcher) {
                watcher = chokidar_1.default.watch(userConfigDir, {
                    ignoreInitial: true,
                });
                watcher.on('change', function () {
                    logger('cyan', '配置文件已发生变更，正在重启...');
                    if (!server) {
                        logger('red', 'dev server is not ready');
                    }
                    else {
                        server.close();
                        server = null;
                        process.send({ type: 'RESTART_DEV' });
                    }
                });
                watcher.on('error', function () {
                    logger('red', 'fail to watch file');
                    process.exit(1);
                });
            }
            onHook('afterDevServer', function (devServer) {
                server = devServer;
            });
        }
    },
};
