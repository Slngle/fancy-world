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
const request_1 = require("./request");
class Repositories {
    constructor(userName, token) {
        this.userName = userName;
        this.token = token;
    }
    tree(projectName, sha) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userName, token } = this;
            const data = yield request_1.requestGet(`/repos/${userName}/${projectName}/git/trees/${sha}?access_token=${token}`);
            const tree = data && data.tree;
            if (tree && tree.length) {
                const list = [];
                tree.forEach(item => {
                    list.push({ type: item.type, sha: item.sha, path: item.path });
                });
                return list;
            }
            else {
                return null;
            }
        });
    }
}
exports.default = Repositories;
