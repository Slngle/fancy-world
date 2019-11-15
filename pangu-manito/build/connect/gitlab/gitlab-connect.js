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
const configStore_1 = require("../../configStore");
const gitlab_1 = require("gitlab");
const ora_1 = __importDefault(require("ora"));
function connect() {
    const { host, token } = configStore_1.getNowToken();
    const api = new gitlab_1.Gitlab({
        token,
        host
    });
    return {
        Projects: {
            all: (payload) => __awaiter(this, void 0, void 0, function* () {
                const spinner = ora_1.default('start loading projects...');
                spinner.start();
                const data = yield api.Projects.all(payload);
                spinner.stop();
                return data;
            })
        },
        Repositories: {
            tree: (projectId, options) => __awaiter(this, void 0, void 0, function* () {
                const spinner = ora_1.default('start loading projects file...');
                spinner.start();
                const data = yield api.Repositories.tree(projectId, {
                    path: options.path,
                    ref: options.ref
                });
                spinner.stop();
                return data;
            })
        },
        RepositoryFiles: {
            show: (projectId, filePath, ref, fileName) => __awaiter(this, void 0, void 0, function* () {
                const spinner = ora_1.default(`start download ${fileName}`);
                spinner.start();
                const data = yield api.RepositoryFiles.show(projectId, filePath, ref);
                spinner.stop();
                return data;
            })
        },
        Tags: {
            all: (projectId) => __awaiter(this, void 0, void 0, function* () {
                const spinner = ora_1.default('start loading groups...');
                spinner.start();
                const data = yield api.Tags.all(projectId);
                spinner.stop();
                return data;
            })
        },
        Groups: {
            all: (payload) => __awaiter(this, void 0, void 0, function* () {
                const spinner = ora_1.default('start loading groups...');
                spinner.start();
                const data = yield api.Groups.all(payload);
                spinner.stop();
                return data;
            }),
            search: (nameOrPath) => __awaiter(this, void 0, void 0, function* () {
                const spinner = ora_1.default('start search groups...');
                spinner.start();
                const data = yield api.Groups.search(nameOrPath);
                spinner.stop();
                return data;
            }),
            show: (groupId) => __awaiter(this, void 0, void 0, function* () {
                const spinner = ora_1.default('show project under groups...');
                spinner.start();
                const data = yield api.Groups.show(groupId);
                spinner.stop();
                return data;
            })
        }
    };
}
exports.connect = connect;
