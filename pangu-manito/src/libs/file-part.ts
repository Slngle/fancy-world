import fs from 'fs'

/*
 * 安全删除到废纸篓
 * */
import { exec } from 'child_process'
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
export function safeDelete(folder: string, saveFirst: boolean): void {
  let files: Array<string>
  if (fs.existsSync(folder)) {
    files = fs.readdirSync(folder)
    files.forEach((file, index) => {
      const curPath = `${folder}/${file}`
      if (fs.statSync(curPath).isDirectory()) {
        safeDelete(curPath, false)
      } else {
        fs.unlinkSync(curPath)
      }
    })
    if (!saveFirst) {
      // 是否保留父文件
      fs.rmdirSync(folder)
    }
  }
}
