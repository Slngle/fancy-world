import inquirer from 'inquirer'
import { addGitToken } from '../configStore'
import { allReadyHave } from './interaction-part'
import { safeDelete } from './file-part'

/*
 * 在configStore里面插入信息
 * */
export async function setTokenInquirer(): Promise<gitInter> {
  console.log()
  // @ts-ignore
  const { host, group, token } = await inquirer.prompt([
    {
      name: 'host',
      type: 'input',
      message: `拉取文件的git源地址  `
    },
    {
      name: 'group',
      type: 'input',
      message: `拉取文件的git源地址下的哪个组  `
    },
    {
      name: 'token',
      type: 'input',
      message: `git源地址的Private token  `
    }
  ])
  if (host && group && token) {
    // 正常填写 加到configstore里面去 然后返还
    const nowTokenGet: gitInter = {
      host,
      group,
      token
    }
    // 检测该host是否存在 不存在就塞进去
    const success: boolean = await addGitToken(nowTokenGet)
    if (success) {
      return nowTokenGet
    } else {
      allReadyHave()
      return {
        host: '',
        group: '',
        token: ''
      }
    }
  } else {
    return {
      host: '',
      group: '',
      token: ''
    }
  }
}

/*
 * 如果有文件怎么处理
 * */
export async function fileProcessing(folder: string): Promise<boolean> {
  // @ts-ignore
  const { process } = await inquirer.prompt([
    {
      type: 'list',
      name: 'process',
      message: '该文件夹下发现文件，如何处理？',
      choices: [
        {
          name: '取消操作',
          value: 'esc'
        },
        {
          name: '删除文件',
          value: 'delete'
        },
        {
          name: '合并文件',
          value: 'combine'
        }
      ]
    }
  ])

  if (process == 'delete') {
    safeDelete(folder, true)
    return true
  } else if (process == 'combine') {
    return true
  } else {
    return false
  }
}

export async function configStoreQes(): Promise<any> {
  // @ts-ignore
  const { config } = await inquirer.prompt([
    {
      type: 'list',
      name: 'config',
      message: '想做什么操作呢？',
      choices: [
        {
          name: '重置store',
          value: 'reset'
        }
      ]
    }
  ])
  return config
}

/*
 * 选择projectId
 * */
export async function chooseProjectId(projects: Array<any>): Promise<number> {
  // @ts-ignore
  projects = projects.map(data => {
    return {
      name: `${data.name}(${data.description || '无描述'})`,
      value: data.id
    }
  })
  console.log()
  const { projectId } = await inquirer.prompt([
    {
      type: 'list',
      name: 'projectId',
      message: '选择拉取哪一个仓库？',
      choices: projects
    }
  ])
  return projectId
}

/*
 * 选择版本号
 * */

export async function chooseTagName(tags: Array<any>): Promise<string> {
  // @ts-ignore
  tags = tags.map(data => {
    return {
      name: `${data.name}(提交者：${data.commit.committer_name})`,
      value: data.name
    }
  })
  const { tagName } = await inquirer.prompt([
    {
      type: 'list',
      name: 'tagName',
      message: '选择哪一个版本？',
      choices: tags
    }
  ])
  return tagName
}
