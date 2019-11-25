import { configSet, getNowHost, getNowToken } from '../configStore'
import { choosePlatform, fileProcessing, setTokenInquirer } from './questions-part'
import { readdirFiles } from '../utils/file-helper'
import { downloadInter } from './interaction-part'

export async function getToken(): Promise<gitInter> {
  const nowToken: gitInter = getNowToken()
  if (nowToken.token) {
    // 如果有直接返回当前的
    return nowToken
  } else {
    // 如果没有去创建
    //1. 选择平台
    const { platform } = await choosePlatform()
    //2. (第一次添加)设置为默认平台
    configSet('currentHost', platform)
    //3. 写入内容
    if (platform == 'gitlab') {
      const { host, token, group } = await setTokenInquirer('gitlab')
      return { host, token, group }
    } else if (platform == 'github') {
      return { host: '', token: '', group: '' }
    } else if (platform == 'npm') {
      const { host, token, group } = await setTokenInquirer('npm')
      return { host, token, group }
    } else {
      return { host: '', token: '', group: '' }
    }
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
    const host = getNowHost()
    if (host == 'gitlab') {
      const { chooseProject } = require('../connect/gitlab')
      const success = await chooseProject(folder)
      downloadInter(success)
    } else if (host == 'npm') {
      const { chooseProject } = require('../connect/npm')
      const success = await chooseProject(folder)
      downloadInter(success)
    }
  }
}
