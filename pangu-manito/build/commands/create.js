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
const file_helper_1 = require("../utils/file-helper");
const interaction_part_1 = require("../libs/interaction-part");
const init_1 = require("./init");
function create(folder, projectName) {
    return __awaiter(this, void 0, void 0, function* () {
        const folderComplete = `${folder}/${projectName}`;
        const stat = yield file_helper_1.folderNotStat(folderComplete);
        if (!stat) {
            // 文件夹已存在
            interaction_part_1.alreadyHave(projectName);
        }
        else {
            yield file_helper_1.mkdir(folderComplete, { recursive: true });
            yield init_1.init(folderComplete);
        }
    });
}
exports.create = create;
