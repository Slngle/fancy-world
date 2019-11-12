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
function setTokenInquirer() {
  return __awaiter(this, void 0, void 0, function*() {
    console.log()
    // @ts-ignore
    const { host, group, token } = yield inquirer_1.default.prompt([
      {
        name: 'url',
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
    if (host && group && token) {
      // 正常填写 加到configstore里面去 然后返还
      const nowTokenGet = {
        host,
        group,
        token
      }
      // 检测该host是否存在
      const success = yield configStore_1.addGitToken(nowTokenGet)
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
