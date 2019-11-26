import inquirer from 'inquirer'
import { addGitToken, configGet } from '../configStore'
import { allReadyHave } from './interaction-part'
import { safeDelete } from './file-part'
import { getVersion } from '../utils/npm/npm-utils'

/*
 * 在configStore里面插入信息
 * */
export async function setTokenInquirer(platform: hostType): Promise<gitInter> {
  console.log()
  // @ts-ignore
  let authMessage: gitInter = {}
  if (platform == 'gitlab') {
    authMessage = await getGitLabAuthMessage()
  } else if (platform == 'github') {
    authMessage = await getGitHubAuthMessage()
  } else {
    authMessage = await getNpmAuthMessage()
  }
  const { host, group, token } = authMessage
  if (host && group && token) {
    // 正常填写 加到configstore里面去 然后返还
    const nowTokenGet: gitInter = {
      host,
      group,
      token
    }
    // 检测该host是否存在 不存在就塞进去
    const success: boolean = await addGitToken(nowTokenGet, platform)
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
 * 选择哪一个平台
 * */
export async function choosePlatform(): Promise<platform> {
  console.log()
  const hostList = configGet('hostList')
  const { platform } = await inquirer.prompt([
    {
      type: 'list',
      name: 'platform',
      message: '请选择平台',
      choices: hostList
    }
  ])
  return { platform }
}

/*
 * 选择 哪一个token
 * */

export async function chooseTokenSingle(list: Array<any>): Promise<any> {
  const listFormat: Array<any> = []

  list.forEach((data, index) => {
    listFormat.push({
      name: `${data.host} && ${data.group}`,
      value: index
    })
  })
  const { index } = await inquirer.prompt([
    {
      type: 'list',
      name: 'index',
      message: '请选择平台',
      choices: listFormat
    }
  ])
  return { index }
}

/*
 * 根据platform的不同 请求不同的quest
 * */
export async function getMessage(): Promise<any> {
  const platform = configGet('currentHost')
  if (platform == 'gitlab') {
    return await getGitLabAuthMessage()
  } else if (platform == 'npm') {
    return await getNpmAuthMessage()
  } else {
    return await getGitHubAuthMessage()
  }
}

/*
 * 询问授权信息
 * */

export async function getGitLabAuthMessage(): Promise<gitInter> {
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
  return { host, group, token }
}

/*
 * github的授权信息
 * */

export async function getGitHubAuthMessage(): Promise<gitInter> {
  console.log()
  // @ts-ignore
  const { host, group, token } = await inquirer.prompt([
    {
      name: 'host',
      type: 'list',
      message: `npm的url地址  `,
      choices: [
        {
          name: 'https://www.npmjs.com',
          value: 'https://www.npmjs.com'
        }
      ]
    },
    {
      name: 'group',
      type: 'input',
      message: `请填写npm的Organizations  `
    },
    {
      name: 'token',
      type: 'input',
      message: `请填写npm的用户名  `
    }
  ])
  return { host, group, token }
}

/*
 * npm的授权信息
 * */

export async function getNpmAuthMessage(): Promise<gitInter> {
  console.log()
  // @ts-ignore
  const { host, group, token } = await inquirer.prompt([
    {
      name: 'host',
      type: 'list',
      message: `npm的url地址  `,
      choices: [
        {
          name: 'https://www.npmjs.com',
          value: 'https://www.npmjs.com'
        }
      ]
    },
    {
      name: 'group',
      type: 'input',
      message: `请填写npm的Organizations  `
    },
    {
      name: 'token',
      type: 'input',
      message: `请填写npm的用户名  `
    }
  ])
  return { host, group, token }
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
          name: '重置configStore',
          value: 'reset'
        },
        {
          name: '配置configStore',
          value: 'edit'
        }
      ]
    }
  ])
  return config
}

/*
 * 重置二次确认
 * */

export async function resetQur(): Promise<any> {
  // @ts-ignore
  const { config } = await inquirer.prompt([
    {
      type: 'list',
      name: 'config',
      message: '重置configStore将会删除您自定义的所有配置！',
      choices: [
        {
          name: '取消',
          value: false
        },
        {
          name: '重置',
          value: true
        }
      ]
    }
  ])
  return config
}

/*
 * 选择是添加 还是删除 还是编辑 或者是选择默认拉取平台
 * */

export async function chooseActions(): Promise<'add' | 'delete' | 'edit' | 'chooseDefault'> {
  // @ts-ignore
  const { actions } = await inquirer.prompt([
    {
      type: 'list',
      name: 'actions',
      message: '需要做哪些配置呢？',
      choices: [
        {
          name: '添加拉取平台',
          value: 'add'
        },
        {
          name: '删除拉取平台',
          value: 'delete'
        },
        {
          name: '编辑拉取平台',
          value: 'edit'
        },
        {
          name: '选择默认拉取平台',
          value: 'chooseDefault'
        }
      ]
    }
  ])
  return actions
}

/*
 * 选择哪个git仓库
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

/*
 * 选择哪个npm仓库
 * */
export async function chooseNpmName(projects: Array<any>): Promise<string> {
  projects = projects.map(data => {
    return {
      name: `${data.title}`,
      value: data.title
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
 * npm包的版本号
 * */
export async function chooseNpmTag(npmName: string): Promise<string> {
  // @ts-ignore
  const list: Array<any> = await getVersion(npmName)
  const listFormat: Array<any> = []
  list.forEach(data => {
    listFormat.push({
      name: data,
      value: data
    })
  })
  const { tagName } = await inquirer.prompt([
    {
      type: 'list',
      name: 'tagName',
      message: '选择哪一个版本？',
      choices: listFormat
    }
  ])
  return tagName
}
