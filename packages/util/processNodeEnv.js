"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function processNodeEnv(command) {
    switch (command) {
        case 'dev':
            process.env.NODE_ENV = 'development';
            break;
        case 'build':
            process.env.NODE_ENV = 'production';
            break;
        default:
            process.env.NODE_ENV = 'production';
    }
}
exports.default = processNodeEnv;
