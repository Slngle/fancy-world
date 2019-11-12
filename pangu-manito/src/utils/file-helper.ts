import path from 'path'
import fs from 'fs'
/*
 * 获取运行当前目录文件夹名称
 * */
export function getCurrentDirectoryBase(): string {
  return path.basename(process.cwd())
}

/*
 * 获取运行当前目录的路径
 * */
export function getCurrentCWD(): string {
  return process.cwd()
}

/*
 * 获取这个项目的根路径
 * */
export function getCurrentRoot(): string {
  return `${__dirname}/../..`
}

/*
 * 读取文件夹
 * */

export function readdirFiles(folder: string): Promise<readFileInter> {
  return new Promise((resolve, reject) => {
    fs.readdir(folder, (err, paths) => {
      resolve({ err, paths })
    })
  })
}
