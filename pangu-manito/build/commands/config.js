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
const questions_part_1 = require('../libs/questions-part')
const configStore_1 = require('../configStore')
const interaction_part_1 = require('../libs/interaction-part')
/*
 * 选择默认的tokens集合
 * */
function chooseDefault(list) {
  return __awaiter(this, void 0, void 0, function*() {
    if (list && list.length) {
      // 有token集
      const { index } = yield questions_part_1.chooseTokenSingle(list, '请选择tokens集合')
      configStore_1.configSet('currentToken', index)
      interaction_part_1.showInfo()
    } else {
      // 提示没有token集
      interaction_part_1.noTokenList()
    }
  })
}
/*
 * 添加一组tokens集合
 * */
function add(list, platform) {
  return __awaiter(this, void 0, void 0, function*() {
    const { host, group, token } = yield questions_part_1.getMessage()
    let alreadyHave = false
    list.forEach(data => {
      if (host == data.host && group == data.group) {
        alreadyHave = true
      }
    })
    if (alreadyHave) {
      interaction_part_1.alreadyHaveTokens()
    } else {
      list.push({ host, group, token })
      configStore_1.configSet(platform, list)
      interaction_part_1.showInfo()
    }
  })
}
/*
 * 删除一组tokens集合
 * */
function deleteTokens(list, platform) {
  return __awaiter(this, void 0, void 0, function*() {
    if (list && list.length) {
      // 有token集
      const { index } = yield questions_part_1.chooseTokenSingle(list, '请选择tokens集合')
      // 删除索引（index）的tokens集合
      list.splice(index, 1)
      configStore_1.configSet(platform, list)
      interaction_part_1.showInfo()
    } else {
      // 提示没有token集
      interaction_part_1.noTokenList()
    }
  })
}
/*
 * 修改一组tokens
 * */
function edit(list, platform) {
  return __awaiter(this, void 0, void 0, function*() {
    if (list && list.length) {
      // 有token集
      const { index } = yield questions_part_1.chooseTokenSingle(list, '请选择tokens集合')
      // 删除索引（index）的tokens集合
      const { host, group, token } = yield questions_part_1.getMessage(platform)
      list.splice(index, 1, { host, group, token })
      configStore_1.configSet(platform, list)
      interaction_part_1.showInfo()
    } else {
      // 提示没有token集
      interaction_part_1.noTokenList()
    }
  })
}
function config() {
  return __awaiter(this, void 0, void 0, function*() {
    // 修改
    const action = yield questions_part_1.chooseActions()
    const { platform } = yield questions_part_1.choosePlatform()
    const list = configStore_1.configGet(platform)
    if (action == 'add') {
      yield add(list, platform)
    } else if (action == 'delete') {
      yield deleteTokens(list, platform)
    } else if (action == 'edit') {
      yield edit(list, platform)
    } else if (action == 'chooseDefault') {
      configStore_1.configSet('currentHost', platform)
      yield chooseDefault(list)
    }
  })
}
exports.config = config
