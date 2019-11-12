'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
const path_1 = __importDefault(require('path'))
/*
 * 获取运行当前目录文件夹名称
 * */
function getCurrentDirectoryBase() {
  return path_1.default.basename(process.cwd())
}
exports.getCurrentDirectoryBase = getCurrentDirectoryBase
/*
 * 获取运行当前目录的路径
 * */
function getCurrentCWD() {
  return process.cwd()
}
exports.getCurrentCWD = getCurrentCWD
/*
 * 获取这个项目的根路径
 * */
function getCurrentRoot() {
  return `${__dirname}/../..`
}
exports.getCurrentRoot = getCurrentRoot
