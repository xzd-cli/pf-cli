"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatorChangelog = exports.getChangelog = exports.getGitUrl = exports.tag = exports.commit = exports.checkAndCommitRepo = exports.getBranch = exports.PROJECT_PATH = void 0;
var inquirer_1 = __importDefault(require("inquirer"));
var shelljs_1 = __importDefault(require("shelljs"));
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var ejs_1 = __importDefault(require("ejs"));
var promise_1 = __importDefault(require("simple-git/promise"));
var logger_1 = __importDefault(require("./logger"));
var helper_1 = require("./helper");
// 命令所在目录
exports.PROJECT_PATH = process.cwd();
var git = (0, promise_1.default)(exports.PROJECT_PATH);
var changelogPath = path_1.default.join(exports.PROJECT_PATH, 'CHANGELOG.md');
exports.default = git;
/**
 * 获取分支信息
 *
 * @export
 * @return {*}
 */
function getBranch() {
    return __awaiter(this, void 0, void 0, function () {
        var branch;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, git.branch()];
                case 1:
                    branch = _a.sent();
                    return [2 /*return*/, branch];
            }
        });
    });
}
exports.getBranch = getBranch;
/**
 * 检测本地仓库git是否干净
 *
 * @export
 * @return {*}
 */
function checkAndCommitRepo() {
    return __awaiter(this, void 0, void 0, function () {
        var status_1, isCommit, error_1, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 8, , 9]);
                    return [4 /*yield*/, git.status()];
                case 1:
                    status_1 = _a.sent();
                    if (!(status_1.files.length > 0)) return [3 /*break*/, 7];
                    return [4 /*yield*/, inquirer_1.default.prompt([
                            {
                                type: 'confirm',
                                name: 'isCommit',
                                message: '检测到你还有代码未提交，是否提交代码？',
                                default: true,
                            },
                        ])];
                case 2:
                    isCommit = (_a.sent()).isCommit;
                    if (!isCommit) return [3 /*break*/, 6];
                    _a.label = 3;
                case 3:
                    _a.trys.push([3, 5, , 6]);
                    return [4 /*yield*/, commit()];
                case 4:
                    _a.sent();
                    return [2 /*return*/, true];
                case 5:
                    error_1 = _a.sent();
                    logger_1.default.error('代码提交失败，请检查后再重试！');
                    return [2 /*return*/, false];
                case 6: return [2 /*return*/, true];
                case 7: return [2 /*return*/, true];
                case 8:
                    error_2 = _a.sent();
                    logger_1.default.error('仓库未初始化，请先初始化仓库！');
                    return [2 /*return*/, false];
                case 9: return [2 /*return*/];
            }
        });
    });
}
exports.checkAndCommitRepo = checkAndCommitRepo;
/**
 * 执行commit
 *
 * @export
 * @param {string} [commitMsg]
 */
function commit(commitMsg) {
    return __awaiter(this, void 0, void 0, function () {
        var current, answer;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getBranch()];
                case 1:
                    current = (_a.sent()).current;
                    if (!!commitMsg) return [3 /*break*/, 3];
                    return [4 /*yield*/, inquirer_1.default.prompt([
                            {
                                type: 'input',
                                name: 'commitMsg',
                                message: '请输入commit-message',
                                required: true,
                            },
                        ])];
                case 2:
                    answer = _a.sent();
                    commitMsg = answer.commitMsg;
                    _a.label = 3;
                case 3:
                    // git提交
                    shelljs_1.default.exec('git add .');
                    shelljs_1.default.exec("git commit -m \"".concat(commitMsg, "\""));
                    shelljs_1.default.exec("git pull origin ".concat(current));
                    shelljs_1.default.exec("git push origin ".concat(current));
                    return [2 /*return*/];
            }
        });
    });
}
exports.commit = commit;
/**
 * 打tag
 *
 * @export
 * @param {*} version
 */
function tag(version) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            shelljs_1.default.exec("git tag ".concat(version));
            shelljs_1.default.exec("git push origin ".concat(version));
            shelljs_1.default.exec("git tag -d ".concat(version));
            return [2 /*return*/];
        });
    });
}
exports.tag = tag;
/**
 * 获取git地址
 *
 * @export
 * @return {*}
 */
function getGitUrl() {
    return __awaiter(this, void 0, void 0, function () {
        var remote, exec;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, git.remote(['--verbose'])];
                case 1:
                    remote = _a.sent();
                    if (!remote) {
                        return [2 /*return*/, ''];
                    }
                    exec = /origin	(.+)\.git \(fetch\)/.exec(remote || '');
                    if (exec && exec.length > 1) {
                        return [2 /*return*/, exec[1]];
                    }
                    return [2 /*return*/, ''];
            }
        });
    });
}
exports.getGitUrl = getGitUrl;
/**
 * 获取changelog
 *
 * @export
 * @return {*}
 */
function getChangelog() {
    var changelog = '';
    try {
        changelog = fs_1.default.readFileSync(changelogPath, { encoding: 'utf8' });
    }
    catch (err) {
        console.log(err);
    }
    return changelog;
}
exports.getChangelog = getChangelog;
/**
 * 生成changelog
 *
 * @export
 * @param {*} version
 */
function generatorChangelog(version) {
    return __awaiter(this, void 0, void 0, function () {
        var current, gitUrl, tags, lastTag, logs, COMMIT_REG, changelogTpl, changelogs, messages, newLog;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    shelljs_1.default.exec('git fetch origin');
                    return [4 /*yield*/, getBranch()];
                case 1:
                    current = (_a.sent()).current;
                    return [4 /*yield*/, getGitUrl()];
                case 2:
                    gitUrl = _a.sent();
                    return [4 /*yield*/, git.tags()];
                case 3:
                    tags = _a.sent();
                    lastTag = tags.latest;
                    if (!!lastTag) return [3 /*break*/, 5];
                    return [4 /*yield*/, git.log()];
                case 4:
                    // 之前没打过tag，所有的commit都要记录
                    logs = _a.sent();
                    return [3 /*break*/, 7];
                case 5: return [4 /*yield*/, git.log({ from: lastTag, to: current })];
                case 6:
                    logs = _a.sent();
                    _a.label = 7;
                case 7:
                    COMMIT_REG = /^(feat|fix|style|refactor):\s.+/;
                    changelogTpl = "## <%= tag %> (2020-11-16)\n<% messages.forEach((item)=>{ %>\n  <%= item %>\n  <% }) %>\n";
                    changelogs = logs.all.filter(function (item) { return item.message && COMMIT_REG.test(item.message); });
                    messages = changelogs.map(function (item) { return "* ".concat(item.message, " ([").concat(item.hash.slice(0, 6), "](").concat(gitUrl, "/commit/").concat(item.hash, "))"); });
                    newLog = ejs_1.default.render(changelogTpl, {
                        tag: version,
                        now: (0, helper_1.getDays)(),
                        messages: messages,
                    });
                    fs_1.default.writeFileSync(changelogPath, "".concat(newLog).concat(getChangelog()));
                    logger_1.default.success('已生成CHANGELOG.md！');
                    return [2 /*return*/];
            }
        });
    });
}
exports.generatorChangelog = generatorChangelog;
