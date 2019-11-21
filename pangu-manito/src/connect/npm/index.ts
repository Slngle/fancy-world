import { mkdir, writeFile } from '../../utils/file-helper'
import { chooseNpmName, chooseNpmTag } from '../../libs/questions-part'
import { noProjects, noTags, noThisGroup } from '../../libs/interaction-part'
import { getNowToken } from '../../configStore'

/*
 * 连接api
 * */
export function connectHost(): any {
  const { connect } = require('./npm-connect')
  return connect()
}

/*
 * 选择拉取项目的东西
 * */
export async function chooseProject(folder: string) {
  const api = connectHost()
  let groups: Array<any> = []
  let npmName: string = ''
  let tag: string = ''
  const { group } = getNowToken()
  try {
    groups = await api.Groups.search()
    npmName = await chooseNpmName(groups)
    tag = await chooseNpmTag(npmName)
    console.log(groups, npmName, tag, 'tagName')
    if (tag && npmName) {
      await pullingCode(folder, `${npmName}@${tag}`)
    }
  } catch (ex) {}

  if (!groups || !groups.length) {
    noThisGroup(group)
  } else if (!npmName) {
    noProjects(group)
  } else if (!tag) {
    noTags()
  }
}

/*
 * 下载文件
 * */
async function pullingCode(folder: string, pkg: string) {
  // 先创建一个.xxx 来暂存文件数据
  const stagingFolder = `${folder}/.pangu`
  const { exec } = require('child_process')
  await mkdir(stagingFolder, { recursive: true })
  exec(`cd ${stagingFolder} && npm install ${pkg}`)
}
