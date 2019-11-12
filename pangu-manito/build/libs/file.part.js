"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * 安全删除到废纸篓
 * */
const child_process_1 = require("child_process");
function safeDelete(folder) {
    return new Promise(resolve => {
        child_process_1.exec(`find ${folder}* -not -name ".git" | xargs rm -rf`, (err, out) => {
            console.log(err, out, 'xxxx');
            if (!err) {
                resolve(true);
            }
            else {
                resolve(false);
            }
        });
    });
}
exports.safeDelete = safeDelete;
