import { folderNotStat, mkdir } from '../utils/file-helper'
import { alreadyHave } from '../libs/interaction-part'
import { init } from './init'

export async function create(folder: string, projectName: string): Promise<any> {
  const folderComplete = `${folder}/${projectName}`
  const stat = await folderNotStat(folderComplete)
  if (!stat) {
    // 文件夹已存在
    alreadyHave(projectName)
    return false
  } else {
    await mkdir(folderComplete, { recursive: true })
    return await init(folderComplete)
  }
}
