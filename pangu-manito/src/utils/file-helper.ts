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

/*
 * 创建文件Promise版
 * */

export function mkdir(path, options = {}): Promise<any> {
  return new Promise(resolve => {
    fs.mkdir(path, options, err => {
      resolve(err)
    })
  })
}

export function writeFile(path, tempate): Promise<any> {
  return new Promise(resolve => {
    fs.writeFile(path, tempate, err => {
      resolve(err)
    })
  })
}

/*
 * 判断路径是否存在
 * */
export function folderNotStat(path): Promise<any> {
  return new Promise((resolve, reject) => {
    fs.stat(path, (err, stats) => {
      resolve(err)
    })
  })
}

/*
 * exec 子进程
 * */
export function execPro(command: string): Promise<any> {
  const { exec } = require('child_process')
  return new Promise((resolve, reject) => {
    exec(command, (err, soldout) => {
      if (!err) {
        resolve(true)
      } else {
        resolve(false)
      }
    })
  })
}
