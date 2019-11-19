import Configstore from 'configstore'
import { getCurrentRoot } from '../utils/file-helper'

const pkg = require(`${getCurrentRoot()}/package.json`)

const schema = {
  hostList: [
    { name: 'gitlab', value: 'gitlab' },
    // { name: 'github', value: 'github' },
    { name: 'npm', value: 'npm' }
  ],
  github: [], // {host:'',token:'',group:''}
  gitlab: [], // {host:'',token:'',group:''}
  npm: [], // {host:'',token:'',group:''}
  currentHost: 'gitlab',
  currentToken: 0
}

const config = new Configstore(pkg.name, schema)

/*
 * 获取当前的hostType 目前（gitlab|github）
 * */
export function getNowHost(): hostType {
  const currentHost: hostType = configGet('currentHost')
  return currentHost
}

/*
 * 获取当前的 host url group
 * */
export function getNowToken(): gitInter {
  const hostType: hostType = getNowHost()
  const list: Array<gitInter> = configGet(hostType)
  const currentToken = configGet('currentToken')
  return list[currentToken] || { host: '', token: '', group: '' }
}

/*
 * 添加token
 * */
export async function addGitToken(gitToken: gitInter, platform: hostType): Promise<boolean> {
  const hostType = platform
  const list: Array<gitInter> = configGet(hostType)
  const allReadyHave = list.findIndex(data => data.host == gitToken.host)
  if (allReadyHave != -1) {
    // 已有
    return false
  } else {
    list.push(gitToken)
    configSet(hostType, list)
    return true
  }
}

export function configGet(key: storeKeyType): any {
  return config.get(key)
}

export function configSet(key: storeKeyType, value: any): void {
  config.set(key, value)
}

/*
 * 根据schema重置store
 * */
export function resetConfig(): void {
  config.set(schema)
}
