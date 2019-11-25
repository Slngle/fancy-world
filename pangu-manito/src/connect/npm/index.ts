import { execPro, mkdir, writeFile } from '../../utils/file-helper'
import { chooseNpmName, chooseNpmTag } from '../../libs/questions-part'
import { noProjects, noTags, noThisGroup } from '../../libs/interaction-part'
import { getNowToken } from '../../configStore'
import { safeDelete } from '../../libs/file-part'
import ora from 'ora'

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
export async function chooseProject(folder: string): Promise<boolean> {
  const api = connectHost()
  let groups: Array<any> = []
  let npmName: string = ''
  let tag: string = ''
  const { group } = getNowToken()
  try {
    groups = await api.Groups.search()
    npmName = await chooseNpmName(groups)
    tag = await chooseNpmTag(npmName)
    if (tag && npmName) {
      return await pullingCode(folder, `${npmName}`, `${tag}`)
    } else {
      return false
    }
  } catch (ex) {
    return false
  }

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
async function pullingCode(folder: string, pkg: string, version: string): Promise<boolean> {
  const spinner = ora('start download projects...')
  spinner.start()
  // 先创建一个.pangu 来暂存文件数据
  const stagingFolder = `${folder}/.pangu`
  const getFileFolder = `${stagingFolder}/node_modules/${pkg}`
  await mkdir(stagingFolder, { recursive: true })
  const letIt = await execPro(`cd ${stagingFolder} && npm install ${pkg}@${version}`)
  if (letIt) {
    // 把getFileFolder里面所有的文件移动到folder下面
    const cp = await execPro(`cp -a ${getFileFolder}/. ${folder}`)
    // 然后删除掉.pangu
    if (cp) {
      safeDelete(stagingFolder, false)
    }
    spinner.stop()
    return !!cp
  } else {
    spinner.stop()
    return false
  }
}
