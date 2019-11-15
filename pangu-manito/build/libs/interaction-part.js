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
const update_notifier_1 = __importDefault(require("update-notifier"));
const file_helper_1 = require("../utils/file-helper");
const figlet_1 = __importDefault(require("figlet"));
const chalk_1 = __importDefault(require("chalk"));
const yosay_1 = __importDefault(require("yosay"));
const fullname_1 = __importDefault(require("fullname"));
const lodash_1 = require("lodash");
const pkg = require(`${file_helper_1.getCurrentRoot()}/package.json`);
/*
 * 检查当前版本是不是最新的
 * 不是会给提示
 * */
function checkVersion() {
    return __awaiter(this, void 0, void 0, function* () {
        const notifier = update_notifier_1.default({ pkg, updateCheckInterval: 0 });
        if (notifier.update) {
            notifier.notify();
        }
    });
}
exports.checkVersion = checkVersion;
/*
 * 展示下cli的大名
 * */
function showCliName() {
    console.log(chalk_1.default.yellow(figlet_1.default.textSync('Pangu', { horizontalLayout: 'full' })));
}
exports.showCliName = showCliName;
/*
 * 展示下对你的尊重
 * */
function showUserAllo() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log();
        const name = yield fullname_1.default();
        const allo = name && lodash_1.isString(name) ? `'Allo ${name.split(' ')[0]}! ` : "'Allo! ";
        console.log(chalk_1.default.yellow(`${allo}`));
    });
}
exports.showUserAllo = showUserAllo;
/*
 * 进程退出时候展示
 * */
function byebye() {
    console.log();
    console.log(yosay_1.default('Bye from us!', { maxLength: 25 }));
}
exports.byebye = byebye;
/*
 * 创建host的时候 host已有
 * */
function allReadyHave() {
    console.log();
    console.log(chalk_1.default.yellow(`该host已存在！`));
}
exports.allReadyHave = allReadyHave;
/*
 * 没有该项目组
 * */
function noThisGroup(groupName) {
    console.log();
    console.log(chalk_1.default.yellow(`${groupName} 项目组不存在！`));
}
exports.noThisGroup = noThisGroup;
/*
 * 项目组下没有项目
 * */
function noProjects(groupName) {
    console.log();
    console.log(chalk_1.default.yellow(`${groupName} 下没有项目！`));
}
exports.noProjects = noProjects;
/*
 * 项目组下没有项目
 * */
function noTags() {
    console.log();
    console.log(chalk_1.default.yellow(`该项目没有发布的版本！`));
}
exports.noTags = noTags;
/*
 * 项目组下没有项目
 * */
function errorMessage() {
    console.log();
    console.log(chalk_1.default.yellow(`拉取项目失败！`));
}
exports.errorMessage = errorMessage;
