"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cli_spinner_1 = __importDefault(require("cli-spinner"));
var chalk_1 = __importDefault(require("chalk"));
var Spinner = /** @class */ (function () {
    function Spinner() {
        this.spinner = cli_spinner_1.default.Spinner();
        this.spinner.setSpinnerString('⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏');
    }
    Spinner.prototype.start = function (title) {
        if (title) {
            this.spinner.setSpinnerTitle("".concat(chalk_1.default.yellow('%s'), " ").concat(title));
        }
        this.spinner.start();
    };
    Spinner.prototype.stop = function (clear) {
        if (clear === void 0) { clear = false; }
        this.spinner.stop(clear);
    };
    Spinner.prototype.clear = function () {
        this.stop(true);
    };
    Spinner.prototype.setTitle = function (title) {
        if (title === void 0) { title = ''; }
        this.spinner.setSpinnerTitle(title);
    };
    Spinner.prototype.setString = function (string) {
        this.spinner.setSpinnerString(string);
    };
    return Spinner;
}());
exports.default = new Spinner();
