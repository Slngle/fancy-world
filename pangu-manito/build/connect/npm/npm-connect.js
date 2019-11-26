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
const ora_1 = __importDefault(require("ora"));
const node_npm_1 = __importDefault(require("../../utils/npm/node-npm"));
function connect() {
    const { host, token, group: organization } = configStore_1.getNowToken();
    const api = new node_npm_1.default(host, organization, token);
    return {
        Tags: {
            all: (packageName) => __awaiter(this, void 0, void 0, function* () {
                const spinner = ora_1.default('start loading groups...');
                spinner.start();
                const data = yield api.Tags.all({ packageName });
                spinner.stop();
                return data;
            })
        },
        Groups: {
            search: () => __awaiter(this, void 0, void 0, function* () {
                const spinner = ora_1.default('start search groups...');
                spinner.start();
                const data = yield api.Groups.search();
                spinner.stop();
                return data;
            })
        }
    };
}
exports.connect = connect;
