"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getVersion(npmName) {
    return new Promise(resolve => {
        const { exec } = require('child_process');
        exec(`npm view ${npmName} versions`, (err, stdout, stderr) => {
            if (!err) {
                const re = /'([^',]+)'/g;
                if (stdout) {
                    const versions = [];
                    stdout.replace(re, function ($0, $1) {
                        versions.push($1);
                    });
                    resolve(versions);
                }
                else {
                    resolve([]);
                }
            }
            else {
                resolve([]);
            }
        });
    });
}
exports.getVersion = getVersion;
