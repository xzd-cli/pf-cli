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
var mkcert_1 = __importDefault(require("mkcert"));
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var logger_1 = __importDefault(require("@rea-scripts/util/logger"));
function generateCA(CADir) {
    return new Promise(function (resolve, reject) {
        mkcert_1.default
            .createCA({
            organization: 'Ols Team',
            countryCode: 'CN',
            state: 'ZJ',
            locality: 'HZ',
            validityDays: 3650,
        })
            .then(function (ca) {
            if (!fs_1.default.existsSync(CADir)) {
                // create OLS_CA folder if not exists
                fs_1.default.mkdirSync(CADir);
            }
            var keyPath = path_1.default.join(CADir, 'rootCa.key');
            var certPath = path_1.default.join(CADir, 'rootCa.crt');
            fs_1.default.writeFileSync(keyPath, ca.key);
            fs_1.default.writeFileSync(certPath, ca.cert);
            resolve({
                key: keyPath,
                cert: certPath,
            });
        })
            .catch(function (err) {
            reject(err);
        });
    });
}
function getCertificate(homeDir) {
    return __awaiter(this, void 0, void 0, function () {
        var CADir, certPath, keyPath;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    CADir = path_1.default.join(homeDir, 'OLS_CA');
                    certPath = path_1.default.join(CADir, 'rootCa.crt');
                    keyPath = path_1.default.join(CADir, 'rootCa.key');
                    if (!(!fs_1.default.existsSync(certPath) || !fs_1.default.existsSync(keyPath))) return [3 /*break*/, 2];
                    return [4 /*yield*/, generateCA(CADir)];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2:
                    logger_1.default.info('当前使用的 HTTPS 证书为手动创建(如有需要请手动信任此文件)');
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            mkcert_1.default
                                .createCert({
                                domains: ['127.0.0.1', 'localhost'],
                                validityDays: 365,
                                caKey: fs_1.default.readFileSync(keyPath),
                                caCert: fs_1.default.readFileSync(certPath),
                            })
                                .then(resolve)
                                .catch(reject);
                        })];
            }
        });
    });
}
exports.default = getCertificate;
