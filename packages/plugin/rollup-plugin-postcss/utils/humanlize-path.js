"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var normalize_path_1 = __importDefault(require("./normalize-path"));
var humanlizePath = function (filepath) { return (0, normalize_path_1.default)(path_1.default.relative(process.cwd(), filepath)); };
exports.default = humanlizePath;
