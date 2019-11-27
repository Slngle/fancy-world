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
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
const inquirer_1 = __importDefault(require('inquirer'))
const configStore_1 = require('../configStore')
const interaction_part_1 = require('./interaction-part')
const file_part_1 = require('./file-part')
const npm_utils_1 = require('../utils/npm/npm-utils')
/*
 * 在configStore里面插入信息
 * */
function setTokenInquirer(platform) {
  return __awaiter(this, void 0, void 0, function*() {
    console.log()
    // @ts-ignore
    let authMessage = {}
    if (platform == 'gitlab') {
      authMessage = yield getGitLabAuthMessage()
    } else if (platform == 'github') {
      authMessage = yield getGitHubAuthMessage()
    } else {
      authMessage = yield getNpmAuthMessage()
    }
    const { host, group, token } = authMessage
    if (host && group && token) {
      // 正常填写 加到configstore里面去 然后返还
      const nowTokenGet = {
        host,
        group,
        token
      }
      // 检测该host是否存在 不存在就塞进去
      const success = yield configStore_1.addGitToken(nowTokenGet, platform)
      if (success) {
        return nowTokenGet
      } else {
        interaction_part_1.allReadyHave()
        return {
          host: '',
          group: '',
          token: ''
        }
      }
    } else {
      return {
        host: '',
        group: '',
        token: ''
      }
    }
  })
}
exports.setTokenInquirer = setTokenInquirer
/*
 * 选择哪一个平台
 * */
function choosePlatform() {
  return __awaiter(this, void 0, void 0, function*() {
    console.log()
    const hostList = configStore_1.configGet('hostList')
    const { platform } = yield inquirer_1.default.prompt([
      {
        type: 'list',
        name: 'platform',
        message: '请选择平台',
        choices: hostList
      }
    ])
    return { platform }
  })
}
exports.choosePlatform = choosePlatform
/*
 * 选择 哪一个token
 * */
function chooseTokenSingle(list, message) {
  return __awaiter(this, void 0, void 0, function*() {
    const listFormat = []
    list.forEach((data, index) => {
      listFormat.push({
        name: `${data.host} && ${data.group}`,
        value: index
      })
    })
    const { index } = yield inquirer_1.default.prompt([
      {
        type: 'list',
        name: 'index',
        message,
        choices: listFormat
      }
    ])
    return { index }
  })
}
exports.chooseTokenSingle = chooseTokenSingle
/*
 * 根据platform的不同 请求不同的quest
 * */
function getMessage(plat) {
  return __awaiter(this, void 0, void 0, function*() {
    const platform = plat || configStore_1.configGet('currentHost')
    if (platform == 'gitlab') {
      return yield getGitLabAuthMessage()
    } else if (platform == 'npm') {
      return yield getNpmAuthMessage()
    } else {
      return yield getGitHubAuthMessage()
    }
  })
}
exports.getMessage = getMessage
/*
 * 询问授权信息
 * */
function getGitLabAuthMessage() {
  return __awaiter(this, void 0, void 0, function*() {
    console.log()
    // @ts-ignore
    const { host, group, token } = yield inquirer_1.default.prompt([
      {
        name: 'host',
        type: 'input',
        message: `拉取文件的git源地址  `
      },
      {
        name: 'group',
        type: 'input',
        message: `拉取文件的git源地址下的哪个组  `
      },
      {
        name: 'token',
        type: 'input',
        message: `git源地址的Private token  `
      }
    ])
    return { host, group, token }
  })
}
exports.getGitLabAuthMessage = getGitLabAuthMessage
/*
 * github的授权信息
 * */
function getGitHubAuthMessage() {
  return __awaiter(this, void 0, void 0, function*() {
    console.log()
    // @ts-ignore
    const { host, group, token } = yield inquirer_1.default.prompt([
      {
        name: 'host',
        type: 'list',
        message: `github的url地址  `,
        choices: [
          {
            name: 'https://github.com',
            value: 'https://github.com'
          }
        ]
      },
      {
        name: 'group',
        type: 'input',
        message: `请填写github用户名  `
      },
      {
        name: 'token',
        type: 'input',
        message: `请填写access token  `
      }
    ])
    return { host, group, token }
  })
}
exports.getGitHubAuthMessage = getGitHubAuthMessage
/*
 * npm的授权信息
 * */
function getNpmAuthMessage() {
  return __awaiter(this, void 0, void 0, function*() {
    console.log()
    // @ts-ignore
    const { host, group, token } = yield inquirer_1.default.prompt([
      {
        name: 'host',
        type: 'list',
        message: `npm的url地址  `,
        choices: [
          {
            name: 'https://www.npmjs.com',
            value: 'https://www.npmjs.com'
          }
        ]
      },
      {
        name: 'group',
        type: 'input',
        message: `请填写npm的Organizations  `
      },
      {
        name: 'token',
        type: 'input',
        message: `请填写npm的用户名  `
      }
    ])
    return { host, group, token }
  })
}
exports.getNpmAuthMessage = getNpmAuthMessage
/*
 * 如果有文件怎么处理
 * */
function fileProcessing(folder) {
  return __awaiter(this, void 0, void 0, function*() {
    // @ts-ignore
    const { process } = yield inquirer_1.default.prompt([
      {
        type: 'list',
        name: 'process',
        message: '该文件夹下发现文件，如何处理？',
        choices: [
          {
            name: '取消操作',
            value: 'esc'
          },
          {
            name: '删除文件',
            value: 'delete'
          },
          {
            name: '合并文件',
            value: 'combine'
          }
        ]
      }
    ])
    if (process == 'delete') {
      file_part_1.safeDelete(folder, true)
      return true
    } else if (process == 'combine') {
      return true
    } else {
      return false
    }
  })
}
exports.fileProcessing = fileProcessing
function configStoreQes() {
  return __awaiter(this, void 0, void 0, function*() {
    // @ts-ignore
    const { config } = yield inquirer_1.default.prompt([
      {
        type: 'list',
        name: 'config',
        message: '想重置哪份配置呢？',
        choices: [
          {
            name: '重置configStore',
            value: 'reset'
          }
        ]
      }
    ])
    return config
  })
}
exports.configStoreQes = configStoreQes
/*
 * 重置二次确认
 * */
function resetQur() {
  return __awaiter(this, void 0, void 0, function*() {
    // @ts-ignore
    const { config } = yield inquirer_1.default.prompt([
      {
        type: 'confirm',
        name: 'config',
        message: '重置configStore将会删除您自定义的所有配置！',
        choices: [
          {
            name: '取消',
            value: false
          },
          {
            name: '重置',
            value: true
          }
        ]
      }
    ])
    return config
  })
}
exports.resetQur = resetQur
/*
 * 选择是添加 还是删除 还是编辑 或者是选择默认拉取平台
 * */
function chooseActions() {
  return __awaiter(this, void 0, void 0, function*() {
    // @ts-ignore
    const { actions } = yield inquirer_1.default.prompt([
      {
        type: 'list',
        name: 'actions',
        message: '需要做哪些配置呢？',
        choices: [
          {
            name: '添加拉取平台',
            value: 'add'
          },
          {
            name: '删除拉取平台',
            value: 'delete'
          },
          {
            name: '编辑拉取平台',
            value: 'edit'
          },
          {
            name: '选择默认拉取平台',
            value: 'chooseDefault'
          }
        ]
      }
    ])
    return actions
  })
}
exports.chooseActions = chooseActions
/*
 * 选择哪个git仓库
 * */
function chooseProjectId(projects) {
  return __awaiter(this, void 0, void 0, function*() {
    // @ts-ignore
    projects = projects.map(data => {
      return {
        name: `${data.name}(${data.description || '无描述'})`,
        value: data.id
      }
    })
    console.log()
    const { projectId } = yield inquirer_1.default.prompt([
      {
        type: 'list',
        name: 'projectId',
        message: '选择拉取哪一个仓库？',
        choices: projects
      }
    ])
    return projectId
  })
}
exports.chooseProjectId = chooseProjectId
/*
 * 选择版本号
 * */
function chooseTagName(tags) {
  return __awaiter(this, void 0, void 0, function*() {
    // @ts-ignore
    tags = tags.map(data => {
      return {
        name: `${data.name}(提交者：${data.commit.committer_name})`,
        value: data.name
      }
    })
    const { tagName } = yield inquirer_1.default.prompt([
      {
        type: 'list',
        name: 'tagName',
        message: '选择哪一个版本？',
        choices: tags
      }
    ])
    return tagName
  })
}
exports.chooseTagName = chooseTagName
/*
 * 选择哪个npm仓库
 * */
function chooseNpmName(projects) {
  return __awaiter(this, void 0, void 0, function*() {
    projects = projects.map(data => {
      return {
        name: `${data.title}`,
        value: data.title
      }
    })
    console.log()
    const { projectId } = yield inquirer_1.default.prompt([
      {
        type: 'list',
        name: 'projectId',
        message: '选择拉取哪一个仓库？',
        choices: projects
      }
    ])
    return projectId
  })
}
exports.chooseNpmName = chooseNpmName
/*
 * npm包的版本号
 * */
function chooseNpmTag(npmName) {
  return __awaiter(this, void 0, void 0, function*() {
    // @ts-ignore
    const list = yield npm_utils_1.getVersion(npmName)
    const listFormat = []
    list.forEach(data => {
      listFormat.push({
        name: data,
        value: data
      })
    })
    const { tagName } = yield inquirer_1.default.prompt([
      {
        type: 'list',
        name: 'tagName',
        message: '选择哪一个版本？',
        choices: listFormat
      }
    ])
    return tagName
  })
}
exports.chooseNpmTag = chooseNpmTag
