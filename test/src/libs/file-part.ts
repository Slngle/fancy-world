import fs from 'fs'

/*
 * 删除一个文件夹里面的所有东西 （除了folderExclude里面的）
 * */
const folderExclude = /\.git/
export function safeDelete(folder: string, saveFirst: boolean): void {
  let files: Array<string>
  if (fs.existsSync(folder) && !folderExclude.test(folder)) {
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
