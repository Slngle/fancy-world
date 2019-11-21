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
const npm_groups_1 = __importDefault(require('./npm-groups'))
const npm_tags_1 = __importDefault(require('./npm-tags'))
class Npm {
  constructor(host, organization, userName) {
    this.Groups = (function() {
      const api = new npm_groups_1.default()
      return {
        search() {
          return __awaiter(this, void 0, void 0, function*() {
            return yield api.search()
          })
        }
      }
    })()
    this.Tags = (function() {
      const api = new npm_tags_1.default()
      return {
        all(payload) {
          return __awaiter(this, void 0, void 0, function*() {
            return yield api.all(payload)
          })
        }
      }
    })()
    this.userName = userName
    this.host = host
    this.organization = organization
  }
}
exports.default = Npm
