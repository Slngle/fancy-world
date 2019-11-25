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
const interaction_part_1 = require('../libs/interaction-part')
const questions_part_1 = require('../libs/questions-part')
const file_helper_1 = require('../utils/file-helper')
/*
 * 根据你本地的配置选择连接哪个代码管理器
 * */
function connectHost() {
  const nowHost = configStore_1.getNowHost()
  let api
  if (nowHost == 'gitlab') {
    const { connect } = require('./gitlab/gitlab-connect')
    api = connect()
  } else if (nowHost == 'github') {
    const { connect } = require('./github/github-connect')
    api = connect()
  } else if (nowHost == 'npm') {
    const { connect } = require('./npm/npm-connect')
    api = connect()
  }
  return api
}
exports.connectHost = connectHost
/*
 * projectId && ref && folder的暂存
 * */
let chooseMessage = {
  projectId: '',
  ref: '',
  folder: ''
}
/*
 * 选择哪个project
 * */
function chooseProject(folder) {
  return __awaiter(this, void 0, void 0, function*() {
    const api = connectHost()
    const { group } = configStore_1.getNowToken()
    let chooseGroup, projects, Tags
    try {
      chooseGroup = yield api.Groups.search(group)
      const projectInGroup = yield api.Groups.show(chooseGroup[0].id)
      projects = projectInGroup && projectInGroup.projects
      const projectId = yield questions_part_1.chooseProjectId(projects)
      Tags = yield api.Tags.all(projectId)
      const ref = yield questions_part_1.chooseTagName(Tags)
      const files = yield api.Repositories.tree(projectId, { path: '', ref })
      if (projectId && ref && folder) {
        chooseMessage = {
          projectId,
          ref,
          folder
        }
        yield createFiles({ files })
      }
    } catch (e) {
      console.log(e)
    }
    if (!chooseGroup || !chooseGroup.length) {
      interaction_part_1.noThisGroup(group)
    } else if (!projects || !projects.length) {
      interaction_part_1.noProjects(group)
    } else if (!Tags || !Tags.length) {
      interaction_part_1.noTags()
    }
  })
}
exports.chooseProject = chooseProject
function createSingle({ name, path }) {
  return __awaiter(this, void 0, void 0, function*() {
    const api = connectHost()
    const { projectId, ref, folder } = chooseMessage
    const re = /\/[^/]+$/
    const folderPath = `${folder}/${path}`.replace(re, '')
    const file = yield api.RepositoryFiles.show(projectId, path, ref, name)
    const dataContent = new Buffer(file.content, 'base64').toString()
    yield file_helper_1.mkdir(folderPath, { recursive: true })
    yield file_helper_1.writeFile(`${folder}/${path}`, dataContent)
    return true
  })
}
function findTree({ path }) {
  return __awaiter(this, void 0, void 0, function*() {
    const { projectId, ref } = chooseMessage
    const api = connectHost()
    const files = yield api.Repositories.tree(projectId, { path, ref })
    return files
  })
}
function createFiles({ files }) {
  return __awaiter(this, void 0, void 0, function*() {
    for (const data of files) {
      if (data.type == 'blob') {
        yield createSingle({
          name: data.name,
          path: data.path
        })
      } else if (data.type == 'tree') {
        const singlePath = data.path
        const tree = yield findTree({ path: singlePath })
        if (tree && tree.length) {
          yield createFiles({ files: tree })
        }
      }
    }
    return true
  })
}
exports.createFiles = createFiles
