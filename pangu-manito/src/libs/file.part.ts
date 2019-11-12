/*
 * 安全删除到废纸篓
 * */
import { exec } from 'child_process'

export async function safeDelete(folder: string): Promise<boolean> {
  console.log(folder, 'folder')
  return true
  // await exec(`find ${folder}* -not -name ".git" | xargs rm -rf`, (err, out) => {})
}
