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
const interaction_part_1 = require('../libs/interaction-part')
const pull_part_1 = require('../libs/pull-part')
function init(folder) {
  return __awaiter(this, void 0, void 0, function*() {
    interaction_part_1.showCliName() // 展示下cli的名字
    yield interaction_part_1.showUserAllo() // 对你的一声问候
    const { host, token, group } = yield pull_part_1.getToken()
    if (host && token && group) {
      // 如果拿到了token等信息 就去pull code
      yield pull_part_1.pullCodeing(folder)
    }
  })
}
exports.init = init