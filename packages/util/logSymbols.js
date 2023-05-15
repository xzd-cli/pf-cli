"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = __importDefault(require("chalk"));
function isUnicodeSupported() {
    if (process.platform !== 'win32') {
        return process.env.TERM !== 'linux'; // Linux console (kernel)
    }
    return (Boolean(process.env.CI) ||
        Boolean(process.env.WT_SESSION) || // Windows Terminal
        process.env.ConEmuTask === '{cmd::Cmder}' || // ConEmu and cmder
        process.env.TERM_PROGRAM === 'vscode' ||
        process.env.TERM === 'xterm-256color' ||
        process.env.TERM === 'alacritty');
}
var main = {
    info: chalk_1.default.blue('ℹ'),
    success: chalk_1.default.green('✔'),
    warning: chalk_1.default.yellow('⚠'),
    error: chalk_1.default.red('✖'),
};
var fallback = {
    info: chalk_1.default.blue('i'),
    success: chalk_1.default.green('√'),
    warning: chalk_1.default.yellow('‼'),
    error: chalk_1.default.red('×'),
};
var logSymbols = isUnicodeSupported() ? main : fallback;
exports.default = logSymbols;
