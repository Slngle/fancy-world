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
const fs_1 = __importDefault(require('fs'))
// export function safeDelete(folder: string): Promise<boolean> {
//   return new Promise<boolean>(resolve => {
//     exec(``, (err, out) => {
//       console.log(err, out, 'xxxx')
//       if (!err) {
//         resolve(true)
//       } else {
//         resolve(false)
//       }
//     })
//   })
// }
function safeDelete(folder) {
  return __awaiter(this, void 0, void 0, function*() {
    let files
    if (fs_1.default.existsSync(folder)) {
      files = fs_1.default.readdirSync(folder)
      files.forEach((file, index) => {})
    }
    return true
  })
}
exports.safeDelete = safeDelete
