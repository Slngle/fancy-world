import { getNowToken } from '../../configStore'
import { noProjects, noTags, noThisGroup } from '../../libs/interaction-part'
import { chooseProjectId, chooseTagGitHub } from '../../libs/questions-part'
import { mkdir, writeFile } from '../../utils/file-helper'

/*
 * 连接api
 * */
export function connectHost(): any {
  const { connect } = require('./github-connect')
  return connect()
}

/*
 * projectId && ref && folder的暂存
 * */

let chooseMessage: chooseMessageS = {
  projectName: '',
  folder: ''
}

/*
 * 选择哪个project
 * */
export async function chooseProject(folder: string) {
  //: Promise<boolean>
  const api = connectHost()
  const { group } = getNowToken()
  let projectInGroup, Tags
  try {
    projectInGroup = await api.Groups.show()
    const projectName = await chooseProjectId(projectInGroup)
    Tags = await api.Tags.all(projectName)
    const sha = await chooseTagGitHub(Tags)
    const files = await api.Repositories.tree(projectName, sha)
    if (folder && projectName && files) {
      chooseMessage = {
        projectName,
        folder
      }
      return await createFiles({ files, path: '' })
    } else {
      return false
    }
  } catch (e) {
    return false
  } finally {
    if (!projectInGroup || !projectInGroup.length) {
      noProjects(group)
    } else if (!Tags || !Tags.length) {
      noTags()
    }
  }
}

async function createSingle({ sha, path, folderPath }) {
  const api = connectHost()
  const { projectName, folder } = chooseMessage
  const folderCombine = `${folder}/${folderPath}`
  const file = await api.RepositoryFiles.show(projectName, sha, path)
  const dataContent = Buffer.from(file.content, 'base64').toString()
  await mkdir(folderCombine, { recursive: true })
  await writeFile(`${folderCombine}/${path}`, dataContent)
  return true
}

async function findTree({ sha }) {
  const { projectName } = chooseMessage
  const api = connectHost()
  const files = await api.Repositories.tree(projectName, sha)
  return files
}

export async function createFiles({ files, path }): Promise<boolean> {
  for (const data of files) {
    if (data.type == 'blob') {
      await createSingle({
        sha: data.sha,
        folderPath: path,
        path: data.path
      })
    } else if (data.type == 'tree') {
      const singlePath = path ? `${path}/${data.path}` : data.path
      const tree = await findTree({ sha: data.sha })
      if (tree && tree.length) {
        await createFiles({ files: tree, path: singlePath })
      }
    }
  }
  return true
}
