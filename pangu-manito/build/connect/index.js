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
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * 根据你本地的配置选择连接哪个代码管理器
 * */
const configStore_1 = require("../configStore");
function connectHost() {
    const nowHost = configStore_1.getNowHost();
    let api;
    if (nowHost == 'gitlab') {
        console.log('gitlab');
        const { connect } = require('./gitlab/gitlab-connect');
        api = connect();
    }
    else if (nowHost == 'github') {
        console.log('github');
        const { connect } = require('./github/github-connect');
        api = connect();
    }
    else if (nowHost == 'npm') {
        console.log('npm');
        const { connect } = require('./npm/npm-connect');
        api = connect();
    }
    return api;
}
exports.connectHost = connectHost;
/*
 * 选择哪个project
 * */
function chooseProject() {
    return __awaiter(this, void 0, void 0, function* () {
        const api = connectHost();
        const { group } = configStore_1.getNowToken();
        let chooseGroup = yield api.Groups.search(group);
        console.log(chooseGroup, 'chooseGroup');
    });
}
exports.chooseProject = chooseProject;
/*
 * 列出托管器下面的文件
 * */
function showGroupFolders() {
    return __awaiter(this, void 0, void 0, function* () { });
}
exports.showGroupFolders = showGroupFolders;
/*
 * 列出文件的版本号
 * */
function showFolderTags() {
    return __awaiter(this, void 0, void 0, function* () { });
}
exports.showFolderTags = showFolderTags;
