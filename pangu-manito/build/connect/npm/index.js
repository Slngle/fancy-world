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
const file_helper_1 = require("../../utils/file-helper");
const questions_part_1 = require("../../libs/questions-part");
const interaction_part_1 = require("../../libs/interaction-part");
const configStore_1 = require("../../configStore");
const file_part_1 = require("../../libs/file-part");
const ora_1 = __importDefault(require("ora"));
/*
 * 连接api
 * */
function connectHost() {
    const { connect } = require('./npm-connect');
    return connect();
}
exports.connectHost = connectHost;
/*
 * 选择拉取项目的东西
 * */
function chooseProject(folder) {
    return __awaiter(this, void 0, void 0, function* () {
        const api = connectHost();
        let groups = [];
        let npmName = '';
        let tag = '';
        const { group } = configStore_1.getNowToken();
        try {
            groups = yield api.Groups.search();
            npmName = yield questions_part_1.chooseNpmName(groups);
            tag = yield questions_part_1.chooseNpmTag(npmName);
            if (tag && npmName) {
                return yield pullingCode(folder, `${npmName}`, `${tag}`);
            }
            else {
                return false;
            }
        }
        catch (ex) {
            return false;
        }
        if (!groups || !groups.length) {
            interaction_part_1.noThisGroup(group);
        }
        else if (!npmName) {
            interaction_part_1.noProjects(group);
        }
        else if (!tag) {
            interaction_part_1.noTags();
        }
    });
}
exports.chooseProject = chooseProject;
/*
 * 下载文件
 * */
function pullingCode(folder, pkg, version) {
    return __awaiter(this, void 0, void 0, function* () {
        const spinner = ora_1.default('start download projects...');
        spinner.start();
        // 先创建一个.pangu 来暂存文件数据
        const stagingFolder = `${folder}/.pangu`;
        const getFileFolder = `${stagingFolder}/node_modules/${pkg}`;
        yield file_helper_1.mkdir(stagingFolder, { recursive: true });
        const letIt = yield file_helper_1.execPro(`cd ${stagingFolder} && npm install ${pkg}@${version}`);
        if (letIt) {
            // 把getFileFolder里面所有的文件移动到folder下面
            const cp = yield file_helper_1.execPro(`cp -a ${getFileFolder}/. ${folder}`);
            // 然后删除掉.pangu
            if (cp) {
                file_part_1.safeDelete(stagingFolder, false);
            }
            spinner.stop();
            return !!cp;
        }
        else {
            spinner.stop();
            return false;
        }
    });
}
