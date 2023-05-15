"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function formatWinPath(outputPath) {
    var isWin = process.platform === 'win32';
    // js\index.js => js/index.js
    return isWin ? outputPath.replace(/\\/g, '/') : outputPath;
}
exports.default = formatWinPath;
