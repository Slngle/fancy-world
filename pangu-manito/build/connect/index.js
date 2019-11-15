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
/*
 * 根据你本地的配置选择连接哪个代码管理器
 * */
const configStore_1 = require("../configStore");
const interaction_part_1 = require("../libs/interaction-part");
const questions_part_1 = require("../libs/questions-part");
const fs_1 = __importDefault(require("fs"));
function connectHost() {
    const nowHost = configStore_1.getNowHost();
    let api;
    if (nowHost == 'gitlab') {
        const { connect } = require('./gitlab/gitlab-connect');
        api = connect();
    }
    else if (nowHost == 'github') {
        const { connect } = require('./github/github-connect');
        api = connect();
    }
    else if (nowHost == 'npm') {
        const { connect } = require('./npm/npm-connect');
        api = connect();
    }
    return api;
}
exports.connectHost = connectHost;
/*
 * 选择哪个project
 * */
function chooseProject(folder) {
    return __awaiter(this, void 0, void 0, function* () {
        const api = connectHost();
        const { group } = configStore_1.getNowToken();
        let chooseGroup, projects, Tags;
        try {
            chooseGroup = yield api.Groups.search(group);
            const projectInGroup = yield api.Groups.show(chooseGroup[0].id);
            projects = projectInGroup && projectInGroup.projects;
            const projectId = yield questions_part_1.chooseProjectId(projects);
            Tags = yield api.Tags.all(projectId);
            const tagName = yield questions_part_1.chooseTagName(Tags);
            const files = yield api.Repositories.tree(projectId, { path: '', ref: tagName });
            const template = yield createTemplate({ folder, files, path: '', ref: tagName, projectId });
        }
        catch (e) {
            console.log(e);
        }
        if (!chooseGroup || !chooseGroup.length) {
            interaction_part_1.noThisGroup(group);
        }
        else if (!projects || !projects.length) {
            interaction_part_1.noProjects(group);
        }
        else if (!Tags || !Tags.length) {
            interaction_part_1.noTags();
        }
    });
}
exports.chooseProject = chooseProject;
/*
 * 创建文件模版
 * [{filePath,folderPath,tempateId}]
 * */
function mkdir(path, options = {}) {
    return new Promise(resolve => {
        fs_1.default.mkdir(path, options, err => {
            resolve(err);
        });
    });
}
function writeFile(path, tempate = '') {
    return new Promise(resolve => {
        fs_1.default.writeFile(path, tempate, err => {
            resolve(err);
        });
    });
}
function createSingle({ projectId, ref, folder, name, path }) {
    return __awaiter(this, void 0, void 0, function* () {
        const re = /\/[^/]+$/;
        const folderPath = `${folder}/${path}`.replace(re, '');
        const file_path = path;
        yield mkdir(folderPath);
        yield writeFile(`${folder}/${path}`);
        console.log(folderPath, name, `${folder}/${path}`, 'folderPath');
        return;
        // const errFolder = await mkdir(folderPath, { recursive: true })
        // if (!errFolder) {
        //   const errFile = await writeFile(folderPath + filePath, tempate)
        //   if (!errFile) {
        //     return {
        //       status: true
        //     }
        //   } else {
        //     return {
        //       status: false,
        //       message: `${filePath} 创建失败！`
        //     }
        //   }
        // } else {
        //   return {
        //     status: false,
        //     message: `${folderPath} 创建失败！`
        //   }
        // }
        return true;
    });
}
function findTree({ projectId, path, ref }) {
    return __awaiter(this, void 0, void 0, function* () {
        const api = connectHost();
        const files = yield api.Repositories.tree(projectId, { path, ref });
        return files;
    });
}
function createTemplate({ folder, files, path, ref, projectId }) {
    return __awaiter(this, void 0, void 0, function* () {
        for (const data of files) {
            if (data.type == 'blob') {
                const status = yield createSingle({ projectId, ref, folder, name: data.name, path: data.path });
                if (!status) {
                    return false;
                }
            }
            else if (data.type == 'tree') {
                let singlePath = data.path;
                const tree = yield findTree({ projectId, path: singlePath, ref });
                if (tree && tree.length) {
                    yield createTemplate({ folder, files: tree, path: singlePath, ref, projectId });
                }
            }
        }
        return true;
    });
}
exports.createTemplate = createTemplate;
