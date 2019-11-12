import path from 'path'

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
