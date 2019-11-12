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
const configstore_1 = __importDefault(require("configstore"));
const file_helper_1 = require("../utils/file-helper");
const pkg = require(`${file_helper_1.getCurrentRoot()}/package.json`);
const schema = {
    hostList: [{ name: 'gitlab', value: 'gitlab' }, { name: 'github', value: 'github' }],
    github: [],
    gitlab: [],
    currentHost: 0,
    currentToken: 0
};
const config = new configstore_1.default(pkg.name, schema);
/*
 * 获取当前的hostType 目前（gitlab|github）
 * */
function getNowHost() {
    const hostList = configGet('hostList');
    const currentHost = configGet('currentHost');
    return hostList[currentHost].value;
}
exports.getNowHost = getNowHost;
/*
 * 获取当前的 host url group
 * */
function getNowToken() {
    const hostType = getNowHost();
    const list = configGet(hostType);
    const currentToken = configGet('currentToken');
    return list[currentToken] || { host: '', token: '', group: '' };
}
exports.getNowToken = getNowToken;
/*
 * 添加token
 * */
function addGitToken(gitToken) {
    return __awaiter(this, void 0, void 0, function* () {
        const hostType = getNowHost();
        const list = configGet(hostType);
        const allReadyHave = list.findIndex(data => data.host == gitToken.host);
        if (allReadyHave != -1) {
            // 已有
            return false;
        }
        else {
            list.push(gitToken);
            configSet(hostType, list);
            return true;
        }
    });
}
exports.addGitToken = addGitToken;
function configGet(key) {
    return config.get(key);
}
exports.configGet = configGet;
function configSet(key, value) {
    config.set(key, value);
}
exports.configSet = configSet;
