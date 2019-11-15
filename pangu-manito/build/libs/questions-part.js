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
const inquirer_1 = __importDefault(require("inquirer"));
const configStore_1 = require("../configStore");
const interaction_part_1 = require("./interaction-part");
const file_part_1 = require("./file-part");
/*
 * 在configStore里面插入信息
 * */
function setTokenInquirer() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log();
        // @ts-ignore
        const { host, group, token } = yield inquirer_1.default.prompt([
            {
                name: 'host',
                type: 'input',
                message: `拉取文件的git源地址  `
            },
            {
                name: 'group',
                type: 'input',
                message: `拉取文件的git源地址下的哪个组  `
            },
            {
                name: 'token',
                type: 'input',
                message: `git源地址的Private token  `
            }
        ]);
        if (host && group && token) {
            // 正常填写 加到configstore里面去 然后返还
            const nowTokenGet = {
                host,
                group,
                token
            };
            // 检测该host是否存在 不存在就塞进去
            const success = yield configStore_1.addGitToken(nowTokenGet);
            if (success) {
                return nowTokenGet;
            }
            else {
                interaction_part_1.allReadyHave();
                return {
                    host: '',
                    group: '',
                    token: ''
                };
            }
        }
        else {
            return {
                host: '',
                group: '',
                token: ''
            };
        }
    });
}
exports.setTokenInquirer = setTokenInquirer;
/*
 * 如果有文件怎么处理
 * */
function fileProcessing(folder) {
    return __awaiter(this, void 0, void 0, function* () {
        // @ts-ignore
        const { process } = yield inquirer_1.default.prompt([
            {
                type: 'list',
                name: 'process',
                message: '该文件夹下发现文件，如何处理？',
                choices: [
                    {
                        name: '取消操作',
                        value: 'esc'
                    },
                    {
                        name: '删除文件',
                        value: 'delete'
                    },
                    {
                        name: '合并文件',
                        value: 'combine'
                    }
                ]
            }
        ]);
        if (process == 'delete') {
            file_part_1.safeDelete(folder, true);
            return true;
        }
        else if (process == 'combine') {
            return true;
        }
        else {
            return false;
        }
    });
}
exports.fileProcessing = fileProcessing;
function configStoreQes() {
    return __awaiter(this, void 0, void 0, function* () {
        // @ts-ignore
        const { config } = yield inquirer_1.default.prompt([
            {
                type: 'list',
                name: 'config',
                message: '想做什么操作呢？',
                choices: [
                    {
                        name: '重置store',
                        value: 'reset'
                    }
                ]
            }
        ]);
        return config;
    });
}
exports.configStoreQes = configStoreQes;
/*
 * 选择projectId
 * */
function chooseProjectId(projects) {
    return __awaiter(this, void 0, void 0, function* () {
        // @ts-ignore
        projects = projects.map(data => {
            return {
                name: `${data.name}(${data.description || '无描述'})`,
                value: data.id
            };
        });
        console.log();
        const { projectId } = yield inquirer_1.default.prompt([
            {
                type: 'list',
                name: 'projectId',
                message: '选择拉取哪一个仓库？',
                choices: projects
            }
        ]);
        return projectId;
    });
}
exports.chooseProjectId = chooseProjectId;
/*
 * 选择版本号
 * */
function chooseTagName(tags) {
    return __awaiter(this, void 0, void 0, function* () {
        // @ts-ignore
        tags = tags.map(data => {
            return {
                name: `${data.name}(提交者：${data.commit.committer_name})`,
                value: data.name
            };
        });
        const { tagName } = yield inquirer_1.default.prompt([
            {
                type: 'list',
                name: 'tagName',
                message: '选择哪一个版本？',
                choices: tags
            }
        ]);
        return tagName;
    });
}
exports.chooseTagName = chooseTagName;
