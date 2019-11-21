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
const file_helper_1 = require('../../utils/file-helper')
const questions_part_1 = require('../../libs/questions-part')
const interaction_part_1 = require('../../libs/interaction-part')
const configStore_1 = require('../../configStore')
/*
 * 连接api
 * */
function connectHost() {
  const { connect } = require('./npm-connect')
  return connect()
}
exports.connectHost = connectHost
/*
 * 选择拉取项目的东西
 * */
function chooseProject(folder) {
  return __awaiter(this, void 0, void 0, function*() {
    const api = connectHost()
    let groups = []
    let npmName = ''
    let tag = ''
    const { group } = configStore_1.getNowToken()
    try {
      groups = yield api.Groups.search()
      npmName = yield questions_part_1.chooseNpmName(groups)
      tag = yield questions_part_1.chooseNpmTag(npmName)
      console.log(groups, npmName, tag, 'tagName')
      if (tag && npmName) {
        yield pullingCode(folder, `${npmName}@${tag}`)
      }
    } catch (ex) {}
    if (!groups || !groups.length) {
      interaction_part_1.noThisGroup(group)
    } else if (!npmName) {
      interaction_part_1.noProjects(group)
    } else if (!tag) {
      interaction_part_1.noTags()
    }
  })
}
exports.chooseProject = chooseProject
/*
 * 下载文件
 * */
function pullingCode(folder, pkg) {
  return __awaiter(this, void 0, void 0, function*() {
    // 先创建一个.xxx 来暂存文件数据
    const stagingFolder = `${folder}/.pangu`
    const { exec } = require('child_process')
    yield file_helper_1.mkdir(stagingFolder, { recursive: true })
    exec(`cd ${stagingFolder} && npm install ${pkg}`)
  })
}
