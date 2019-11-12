import inquirer from 'inquirer'
import { addGitToken } from '../configStore'
import { allReadyHave } from './interaction-part'

export async function setTokenInquirer(): Promise<gitInter> {
  console.log()
  // @ts-ignore
  const { host, group, token } = await inquirer.prompt([
    {
      name: 'url',
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
    // 检测该host是否存在
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
