import { getNowToken } from '../../configStore'
import { noProjects, noTags, noThisGroup } from '../../libs/interaction-part'
import { chooseProjectId, chooseTagName } from '../../libs/questions-part'
import { mkdir, writeFile } from '../../utils/file-helper'

/*
 * 连接api
 * */
export function connectHost(): any {
  const { connect } = require('./gitlab-connect')
  return connect()
}

/*
 * projectId && ref && folder的暂存
 * */
let chooseMessage: chooseMessage = {
  projectId: '',
  ref: '',
  folder: ''
}

/*
 * 选择哪个project
 * */
export async function chooseProject(folder: string): Promise<boolean> {
  const api = connectHost()
  const { group } = getNowToken()
  let chooseGroup, projects, Tags

  try {
    chooseGroup = await api.Groups.search(group)
    const projectInGroup = await api.Groups.show(chooseGroup[0].id)
    projects = projectInGroup && projectInGroup.projects
    const projectId = await chooseProjectId(projects)
    Tags = await api.Tags.all(projectId)
    const ref = await chooseTagName(Tags)
    const files = await api.Repositories.tree(projectId, { path: '', ref })
    if (projectId && ref && folder) {
      chooseMessage = {
        projectId,
        ref,
        folder
      }
      return await createFiles({ files })
    } else {
      return false
    }
  } catch (e) {
    return false
  }

  if (!chooseGroup || !chooseGroup.length) {
    noThisGroup(group)
  } else if (!projects || !projects.length) {
    noProjects(group)
  } else if (!Tags || !Tags.length) {
    noTags()
  }
}

async function createSingle({ name, path }) {
  const api = connectHost()
  const { projectId, ref, folder } = chooseMessage
  const re = /\/[^/]+$/
  const folderPath = `${folder}/${path}`.replace(re, '')
  const file = await api.RepositoryFiles.show(projectId, path, ref, name)
  const dataContent = Buffer.from(file.content, 'base64').toString()
  await mkdir(folderPath, { recursive: true })
  await writeFile(`${folder}/${path}`, dataContent)
  return true
}

async function findTree({ path }) {
  const { projectId, ref } = chooseMessage
  const api = connectHost()
  const files = await api.Repositories.tree(projectId, { path, ref })
  return files
}

export async function createFiles({ files }): Promise<boolean> {
  for (const data of files) {
    if (data.type == 'blob') {
      await createSingle({
        name: data.name,
        path: data.path
      })
    } else if (data.type == 'tree') {
      const singlePath = data.path
      const tree = await findTree({ path: singlePath })
      if (tree && tree.length) {
        await createFiles({ files: tree })
      }
    }
  }
  return true
}
