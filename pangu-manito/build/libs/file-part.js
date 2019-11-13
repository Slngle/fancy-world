'use strict'
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
const re = /\.git/
/*
 * 删除一个文件夹里面的所有东西
 * */
function safeDelete(folder, saveFirst) {
  let files
  if (fs_1.default.existsSync(folder)) {
    files = fs_1.default.readdirSync(folder)
    files.forEach((file, index) => {
      const curPath = `${folder}/${file}`
      if (fs_1.default.statSync(curPath).isDirectory()) {
        safeDelete(curPath, false)
      } else {
        fs_1.default.unlinkSync(curPath)
      }
    })
    if (!saveFirst) {
      // 是否保留父文件
      fs_1.default.rmdirSync(folder)
    }
  }
}
exports.safeDelete = safeDelete
