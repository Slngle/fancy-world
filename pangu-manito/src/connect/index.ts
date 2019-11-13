/*
 * 根据你本地的配置选择连接哪个代码管理器
 * */
import { getNowHost } from '../configStore'

export function connectHost(): any {
  const nowHost = getNowHost()
  let api: any
  if (nowHost == 'gitlab') {
    const { connect } = require('./gitlab/gitlab-connect')
    api = connect()
  } else if (nowHost == 'github') {
    const { connect } = require('./github/github-connect')
    api = connect()
  } else if (nowHost == 'npm') {
    const { connect } = require('./npm/npm-connect')
    api = connect()
  }
  return api
}

/*
 * 选择哪个project
 * */
export async function chooseProject(): Promise<any> {
  const api = connectHost()
  console.log(api.groups.all)
}

/*
 * 列出托管器下面的文件
 * */
export async function showGroupFolders() {}

/*
 * 列出文件的版本号
 * */
export async function showFolderTags() {}
