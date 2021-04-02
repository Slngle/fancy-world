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
const npm_spider_1 = require("./npm-spider");
class Groups {
    search() {
        return __awaiter(this, void 0, void 0, function* () {
            const { host, token, group } = configStore_1.getNowToken();
            return yield npm_spider_1.getNpmProjectAndMessage(host, token, group);
        });
    }
}
exports.default = Groups;
