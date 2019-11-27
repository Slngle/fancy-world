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
const interaction_part_1 = require('./interaction-part')
function getToken() {
  return __awaiter(this, void 0, void 0, function*() {
    const nowToken = configStore_1.getNowToken()
    if (nowToken.token) {
      // 如果有直接返回当前的
      return nowToken
    } else {
      // 如果没有去创建
      //1. 选择平台
      const { platform } = yield questions_part_1.choosePlatform()
      //2. (第一次添加)设置为默认平台
      configStore_1.configSet('currentHost', platform)
      configStore_1.configSet('currentToken', 0)
      //3. 写入内容
      if (platform == 'gitlab') {
        const { host, token, group } = yield questions_part_1.setTokenInquirer('gitlab')
        return { host, token, group }
      } else if (platform == 'github') {
        const { host, token, group } = yield questions_part_1.setTokenInquirer('github')
        return { host, token, group }
      } else if (platform == 'npm') {
        const { host, token, group } = yield questions_part_1.setTokenInquirer('npm')
        return { host, token, group }
      } else {
        return { host: '', token: '', group: '' }
      }
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
    const success = yield buildFolder(folder)
    if (success) {
      // 文件的问题解决了 就去对应的托管器选择要拉取的project
      const host = configStore_1.getNowHost()
      if (host == 'gitlab') {
        const { chooseProject } = require('../connect/gitlab')
        const success = yield chooseProject(folder)
        interaction_part_1.downloadInter(success)
      } else if (host == 'npm') {
        const { chooseProject } = require('../connect/npm')
        const success = yield chooseProject(folder)
        interaction_part_1.downloadInter(success)
      } else if (host == 'github') {
        const { chooseProject } = require('../connect/github')
        const success = yield chooseProject(folder)
        interaction_part_1.downloadInter(success)
      }
    }
  })
}
exports.pullCodeing = pullCodeing
