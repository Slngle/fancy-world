"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
/*
 * 获取运行当前目录文件夹名称
 * */
function getCurrentDirectoryBase() {
    return path_1.default.basename(process.cwd());
}
exports.getCurrentDirectoryBase = getCurrentDirectoryBase;
/*
 * 获取运行当前目录的路径
 * */
function getCurrentCWD() {
    return process.cwd();
}
exports.getCurrentCWD = getCurrentCWD;
/*
 * 获取这个项目的根路径
 * */
function getCurrentRoot() {
    return `${__dirname}/../..`;
}
exports.getCurrentRoot = getCurrentRoot;
/*
 * 读取文件夹
 * */
function readdirFiles(folder) {
    return new Promise((resolve, reject) => {
        fs_1.default.readdir(folder, (err, paths) => {
            resolve({ err, paths });
        });
    });
}
exports.readdirFiles = readdirFiles;
/*
 * 创建文件Promise版
 * */
function mkdir(path, options = {}) {
    return new Promise(resolve => {
        fs_1.default.mkdir(path, options, err => {
            resolve(err);
        });
    });
}
exports.mkdir = mkdir;
function writeFile(path, tempate) {
    return new Promise(resolve => {
        fs_1.default.writeFile(path, tempate, err => {
            resolve(err);
        });
    });
}
exports.writeFile = writeFile;
/*
 * 判断路径是否存在
 * */
function folderNotStat(path) {
    return new Promise((resolve, reject) => {
        fs_1.default.stat(path, (err, stats) => {
            resolve(err);
        });
    });
}
exports.folderNotStat = folderNotStat;
/*
 * exec 子进程
 * */
function execPro(command) {
    const { exec } = require('child_process');
    return new Promise((resolve, reject) => {
        exec(command, (err, soldout) => {
            if (!err) {
                resolve(true);
            }
            else {
                resolve(false);
            }
        });
    });
}
exports.execPro = execPro;
