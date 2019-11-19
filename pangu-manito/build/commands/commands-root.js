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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = __importDefault(require("commander"));
const file_helper_1 = require("../utils/file-helper");
const init_1 = require("./init");
const create_1 = require("./create");
const config_1 = require("./config");
const show_1 = require("./show");
const pkg = require(`${file_helper_1.getCurrentRoot()}/package.json`);
function commands(args) {
    commander_1.default.version(pkg.version, '-V, --version').usage('<command> [options]');
    commander_1.default
        .command('init')
        .description('当前目录下初始化')
        .action(function () {
        return __awaiter(this, void 0, void 0, function* () {
            yield init_1.init(`${file_helper_1.getCurrentCWD()}`);
        });
    });
    commander_1.default
        .command('create <projectName>')
        .description('创建<projectName>并在该目录下初始化')
        .action(function (projectName) {
        return __awaiter(this, void 0, void 0, function* () {
            yield create_1.create(`${file_helper_1.getCurrentCWD()}`, `${projectName}`);
        });
    });
    commander_1.default
        .command('info')
        .description('展示configStore配置信息')
        .action(function () {
        return __awaiter(this, void 0, void 0, function* () {
            yield show_1.show();
        });
    });
    commander_1.default
        .command('config')
        .description('配置configStore')
        .action(function () {
        return __awaiter(this, void 0, void 0, function* () {
            yield config_1.config();
        });
    });
    commander_1.default.parse(args);
}
exports.commands = commands;
