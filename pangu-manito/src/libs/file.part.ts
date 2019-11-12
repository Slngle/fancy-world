/*
 * 安全删除到废纸篓
 * */
import { exec } from 'child_process'

export function safeDelete(folder: string): Promise<boolean> {
  return new Promise<boolean>(resolve => {
    exec(`find ${folder}* -not -name ".git" | xargs rm -rf`, (err, out) => {
      console.log(err, out, 'xxxx')
      if (!err) {
        resolve(true)
      } else {
        resolve(false)
      }
    })
  })
}
