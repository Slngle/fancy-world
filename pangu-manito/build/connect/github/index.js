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
const configStore_1 = require("../../configStore");
const interaction_part_1 = require("../../libs/interaction-part");
const questions_part_1 = require("../../libs/questions-part");
const file_helper_1 = require("../../utils/file-helper");
/*
 * 连接api
 * */
function connectHost() {
    const { connect } = require('./github-connect');
    return connect();
}
exports.connectHost = connectHost;
/*
 * projectId && ref && folder的暂存
 * */
let chooseMessage = {
    projectName: '',
    folder: ''
};
/*
 * 选择哪个project
 * */
function chooseProject(folder) {
    return __awaiter(this, void 0, void 0, function* () {
        //: Promise<boolean>
        const api = connectHost();
        const { group } = configStore_1.getNowToken();
        let projectInGroup, Tags;
        try {
            projectInGroup = yield api.Groups.show();
            const projectName = yield questions_part_1.chooseProjectId(projectInGroup);
            Tags = yield api.Tags.all(projectName);
            const sha = yield questions_part_1.chooseTagGitHub(Tags);
            const files = yield api.Repositories.tree(projectName, sha);
            if (folder && projectName && files) {
                chooseMessage = {
                    projectName,
                    folder
                };
                return yield createFiles({ files, path: '' });
            }
            else {
                return false;
            }
        }
        catch (e) {
            return false;
        }
        finally {
            if (!projectInGroup || !projectInGroup.length) {
                interaction_part_1.noProjects(group);
            }
            else if (!Tags || !Tags.length) {
                interaction_part_1.noTags();
            }
        }
    });
}
exports.chooseProject = chooseProject;
function createSingle({ sha, path, folderPath }) {
    return __awaiter(this, void 0, void 0, function* () {
        const api = connectHost();
        const { projectName, folder } = chooseMessage;
        const folderCombine = `${folder}/${folderPath}`;
        const file = yield api.RepositoryFiles.show(projectName, sha, path);
        const dataContent = Buffer.from(file.content, 'base64').toString();
        yield file_helper_1.mkdir(folderCombine, { recursive: true });
        yield file_helper_1.writeFile(`${folderCombine}/${path}`, dataContent);
        return true;
    });
}
function findTree({ sha }) {
    return __awaiter(this, void 0, void 0, function* () {
        const { projectName } = chooseMessage;
        const api = connectHost();
        const files = yield api.Repositories.tree(projectName, sha);
        return files;
    });
}
function createFiles({ files, path }) {
    return __awaiter(this, void 0, void 0, function* () {
        for (const data of files) {
            if (data.type == 'blob') {
                yield createSingle({
                    sha: data.sha,
                    folderPath: path,
                    path: data.path
                });
            }
            else if (data.type == 'tree') {
                const singlePath = path ? `${path}/${data.path}` : data.path;
                const tree = yield findTree({ sha: data.sha });
                if (tree && tree.length) {
                    yield createFiles({ files: tree, path: singlePath });
                }
            }
        }
        return true;
    });
}
exports.createFiles = createFiles;
