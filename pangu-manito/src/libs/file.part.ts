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

export async function safeDelete(folder: string): Promise<boolean> {
  let files: Array<string>
  if (fs.existsSync(folder)) {
    files = fs.readdirSync(folder)
    files.forEach((file, index) => {})
  }
  return true
}
