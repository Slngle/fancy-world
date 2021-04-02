"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const superagent_1 = __importDefault(require("superagent"));
function requestGet(url) {
    return new Promise(resolve => {
        superagent_1.default
            .get(`https://api.github.com${url}`)
            .set('encoding', 'utf-8')
            .set('User-Agent', 'pangu-npm')
            .set('Accept', 'application/vnd.github.v3+json')
            .end(function (err, res) {
            const body = res && res.body;
            if (err || !body) {
                resolve(null);
            }
            else {
                resolve(body);
            }
        });
    });
}
exports.requestGet = requestGet;
