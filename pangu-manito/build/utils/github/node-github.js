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
const github_groups_1 = __importDefault(require("./github-groups"));
const github_tags_1 = __importDefault(require("./github-tags"));
const github_repositories_1 = __importDefault(require("./github-repositories"));
const github_repositoryFiles_1 = __importDefault(require("./github-repositoryFiles"));
class NodeGithub {
    constructor(userName, token) {
        this.userName = userName;
        this.token = token;
        this.Groups = (() => {
            return this.GroupsFn();
        })();
        this.Projects = (() => {
            return this.ProjectsFn();
        })();
        this.Repositories = (() => {
            return this.RepositoriesFn();
        })();
        this.RepositoryFiles = (() => {
            return this.RepositoryFilesFn();
        })();
        this.Tags = (() => {
            return this.TagsFn();
        })();
    }
    GroupsFn() {
        const api = new github_groups_1.default(this.userName, this.token);
        return {
            search() {
                return __awaiter(this, void 0, void 0, function* () {
                    return yield api.search();
                });
            },
            show() {
                return __awaiter(this, void 0, void 0, function* () {
                    return yield api.show();
                });
            }
        };
    }
    ProjectsFn() { }
    RepositoriesFn() {
        const api = new github_repositories_1.default(this.userName, this.token);
        return {
            tree(projectName, sha) {
                return __awaiter(this, void 0, void 0, function* () {
                    return yield api.tree(projectName, sha);
                });
            }
        };
    }
    RepositoryFilesFn() {
        const api = new github_repositoryFiles_1.default(this.userName, this.token);
        return {
            show(projectName, sha) {
                return __awaiter(this, void 0, void 0, function* () {
                    return yield api.show(projectName, sha);
                });
            }
        };
    }
    TagsFn() {
        const api = new github_tags_1.default(this.userName, this.token);
        return {
            all(projectName) {
                return __awaiter(this, void 0, void 0, function* () {
                    return yield api.all(projectName);
                });
            }
        };
    }
}
exports.default = NodeGithub;
