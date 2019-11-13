import inquirer from 'inquirer'
import { addGitToken } from '../configStore'
import { allReadyHave } from './interaction-part'
import { safeDelete } from './file-part'

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
