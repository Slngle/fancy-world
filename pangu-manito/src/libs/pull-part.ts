import { getNowToken } from '../configStore'
import { fileProcessing, setTokenInquirer } from './questions-part'
import { readdirFiles } from '../utils/file-helper'
import { chooseProject } from '../connect'

export async function getToken(): Promise<gitInter> {
  const nowToken: gitInter = getNowToken()
  if (nowToken.token) {
    // 如果有直接返回当前的
    return nowToken
  } else {
    // 如果没有直接去创建
    const { host, token, group } = await setTokenInquirer()
    return { host, token, group }
  }
}

export async function buildFolder(folder: string): Promise<boolean> {
  const { err, paths } = await readdirFiles(folder)
  if (!err) {
    if (paths && paths.length && !(paths.length == 1 && paths[0] == '.git')) {
      // folder文件夹下有文件 询问是否删除还是合并
      const success: boolean = await fileProcessing(folder)
      return success
    } else {
      return true
    }
  } else {
    return false
  }
}

export async function pullCodeing(folder: string) {
  const success = await buildFolder(folder)
  if (success) {
    // 文件的问题解决了 就去对应的托管器选择要拉取的project
    await chooseProject(folder)
  }
}
