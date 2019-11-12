'use strict'
var __awaiter =
  (this && this.__awaiter) ||
  function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function(resolve) {
            resolve(value)
          })
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value))
        } catch (e) {
          reject(e)
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value))
        } catch (e) {
          reject(e)
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected)
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next())
    })
  }
Object.defineProperty(exports, '__esModule', { value: true })
const configStore_1 = require('../configStore')
const questions_part_1 = require('./questions-part')
const file_helper_1 = require('../utils/file-helper')
function getToken() {
  return __awaiter(this, void 0, void 0, function*() {
    const nowToken = configStore_1.getNowToken()
    if (nowToken.token) {
      // 如果有直接返回当前的
      return nowToken
    } else {
      // 如果没有直接去创建
      const { host, token, group } = yield questions_part_1.setTokenInquirer()
      return { host, token, group }
    }
  })
}
exports.getToken = getToken
function buildFolder(folder) {
  return __awaiter(this, void 0, void 0, function*() {
    const { err, paths } = yield file_helper_1.readdirFiles(folder)
    if (!err) {
      if (paths && paths.length && !(paths.length == 1 && paths[0] == '.git')) {
        // folder文件夹下有文件 询问是否删除还是合并
        const success = yield questions_part_1.fileProcessing(folder)
        return success
      } else {
        return true
      }
    } else {
      return false
    }
  })
}
exports.buildFolder = buildFolder
function pullCodeing(folder) {
  return __awaiter(this, void 0, void 0, function*() {
    yield buildFolder(folder)
  })
}
exports.pullCodeing = pullCodeing
