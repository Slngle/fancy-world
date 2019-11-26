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
function reset() {
  return __awaiter(this, void 0, void 0, function*() {
    const config = yield questions_part_1.configStoreQes()
    if (config == 'reset') {
      // 重置configStore
      const reset = yield questions_part_1.resetQur()
      if (reset) {
        configStore_1.resetConfig()
        interaction_part_1.showInfo()
      }
    }
  })
}
exports.reset = reset
