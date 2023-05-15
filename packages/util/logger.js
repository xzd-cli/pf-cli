"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = __importDefault(require("chalk"));
var logSymbols_1 = __importDefault(require("./logSymbols"));
function logger(color, title) {
    if (typeof title === 'undefined') {
        console.log(color);
        return;
    }
    console.log(chalk_1.default[color](title));
}
logger.success = function (title) { return logger('cyan', "".concat(logSymbols_1.default.success, " ").concat(title)); };
logger.warning = function (title) { return logger('yellow', "".concat(logSymbols_1.default.warning, " ").concat(title)); };
logger.error = function (title) { return logger('red', "".concat(logSymbols_1.default.error, " ").concat(title)); };
logger.info = function (title) { return logger('white', "".concat(logSymbols_1.default.info, " ").concat(title)); };
logger.chalk = chalk_1.default;
exports.default = logger;
