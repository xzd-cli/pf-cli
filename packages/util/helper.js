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
exports.getTimes = exports.getFormatEllipsis = exports.getFullDay = exports.getDays = exports.pickPropertyByArr = void 0;
function pickPropertyByArr(arr, key) {
    if (!Array.isArray(arr)) {
        return [];
    }
    return arr.reduce(function (pre, cur) {
        return __spreadArray(__spreadArray([], pre, true), (cur[key] || []), true);
    }, []);
}
exports.pickPropertyByArr = pickPropertyByArr;
var getDays = function () {
    var date = new Date();
    return "".concat(date.getFullYear(), "-").concat(date.getMonth() + 1, "-").concat(date.getDate());
};
exports.getDays = getDays;
var getFullDay = function (timestamp) {
    var date = new Date(timestamp);
    return "".concat(date.getFullYear(), "-").concat(date.getMonth() + 1, "-").concat(date.getDate(), " ").concat(String(date.getHours()).padStart(2, '0'), ":").concat(String(date.getMinutes()).padStart(2, '0'), ":").concat(String(date.getSeconds()).padStart(2, '0'));
};
exports.getFullDay = getFullDay;
function getFormatEllipsis(str, len) {
    if (str.length < len) {
        return str;
    }
    return str.slice(0, len - 3).concat('...');
}
exports.getFormatEllipsis = getFormatEllipsis;
function getTimes(time) {
    // 暂时只支持到分+秒，应该不存在时的情况
    var minutes = parseInt(String(time / 60), 10);
    var seconds = time - minutes * 60;
    return "".concat(String(minutes).padStart(2, '0'), ":").concat(String(seconds).padStart(2, '0'));
}
exports.getTimes = getTimes;
