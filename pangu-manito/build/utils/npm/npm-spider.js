"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio_1 = __importDefault(require("cheerio"));
const superagent_1 = __importDefault(require("superagent"));
function getNpmProjectAndMessage(host, userName, organization) {
    return new Promise(resolve => {
        host = host.replace(/\/&/, '');
        superagent_1.default
            .get(`${host}/~${userName}`)
            .set('encoding', 'utf-8')
            .end(function (err, resp) {
            const html = resp.text;
            const $ = cheerio_1.default.load(html); //采用cheerio模块解析html
            const group = [];
            $('.ef4d7c63 .flex h3').each(function (index, item) {
                const re = new RegExp(`@${organization}`); // /@[^/]+/
                //@ts-ignore
                const title = $(this)
                    .text()
                    .trim();
                if (re.test(title)) {
                    group.push({
                        title
                    });
                }
            });
            resolve(group);
        });
    });
}
exports.getNpmProjectAndMessage = getNpmProjectAndMessage;
