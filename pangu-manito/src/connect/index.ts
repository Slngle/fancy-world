/*
 * 根据你本地的配置选择连接哪个代码管理器
 * */
import { getNowHost, getNowToken } from '../configStore'
import { noProjects, noTags, noThisGroup } from '../libs/interaction-part'
import { chooseProjectId, chooseTagName } from '../libs/questions-part'
import fs from 'fs'

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
export async function chooseProject(folder: string): Promise<any> {
  const api = connectHost()
  const { group } = getNowToken()
  let chooseGroup, projects, Tags

  try {
    chooseGroup = await api.Groups.search(group)
    const projectInGroup = await api.Groups.show(chooseGroup[0].id)
    projects = projectInGroup && projectInGroup.projects
    const projectId = await chooseProjectId(projects)
    Tags = await api.Tags.all(projectId)
    const tagName = await chooseTagName(Tags)
    const files = await api.Repositories.tree(projectId, { path: '', ref: tagName })
    const template = await createTemplate({ folder, files, path: '', ref: tagName, projectId })
  } catch (e) {
    console.log(e)
  }

  if (!chooseGroup || !chooseGroup.length) {
    noThisGroup(group)
  } else if (!projects || !projects.length) {
    noProjects(group)
  } else if (!Tags || !Tags.length) {
    noTags()
  }
}

/*
 * 创建文件模版
 * [{filePath,folderPath,tempateId}]
 * */

function mkdir(path, options = {}) {
  return new Promise(resolve => {
    fs.mkdir(path, options, err => {
      resolve(err)
    })
  })
}

function writeFile(path, tempate = '') {
  return new Promise(resolve => {
    fs.writeFile(path, tempate, err => {
      resolve(err)
    })
  })
}

async function createSingle({ projectId, ref, folder, name, path }) {
  const api = connectHost()
  const re = /\/[^/]+$/
  const folderPath = `${folder}/${path}`.replace(re, '')
  const filePath = path
  console.log(folderPath, filePath, 'xxxx')
  const file = await api.RepositoryFiles.show(projectId, filePath, ref, name)
  let dataContent = new Buffer(file.content, 'base64').toString()
  console.log(dataContent)
  return
  await mkdir(folderPath)
  await writeFile(`${folder}/${path}`)
  console.log(folderPath, name, `${folder}/${path}`, 'folderPath')
  return true
}

async function findTree({ projectId, path, ref }) {
  const api = connectHost()
  const files = await api.Repositories.tree(projectId, { path, ref })
  return files
}

export async function createTemplate({ folder, files, path, ref, projectId }): Promise<boolean> {
  for (const data of files) {
    if (data.type == 'blob') {
      const status = await createSingle({
        projectId,
        ref,
        folder,
        name: data.name,
        path: data.path
      })
      if (!status) {
        return false
      }
    } else if (data.type == 'tree') {
      let singlePath = data.path
      const tree = await findTree({ projectId, path: singlePath, ref })
      if (tree && tree.length) {
        await createTemplate({ folder, files: tree, path: singlePath, ref, projectId })
      }
    }
  }
  return true
}
