import updateNotifier from 'update-notifier'
import { getCurrentRoot } from '../utils/file-helper'
import figlet from 'figlet'
import chalk from 'chalk'
import yosay from 'yosay'
import fullname from 'fullname'
import { isString } from 'lodash'
import { configGet, getNowHost, getNowToken } from '../configStore'

const pkg = require(`${getCurrentRoot()}/package.json`)
/*
 * 检查当前版本是不是最新的
 * 不是会给提示
 * */
export async function checkVersion(): Promise<any> {
  const notifier: any = updateNotifier({ pkg, updateCheckInterval: 0 })

  if (notifier.update) {
    notifier.notify()
  }
}
/*
 * 展示下cli的大名
 * */
export function showCliName(): void {
  console.log(chalk.yellow(figlet.textSync('Pangu', { horizontalLayout: 'full' })))
}

/*
 * 展示下对你的尊重
 * */
export async function showUserAllo(): Promise<any> {
  console.log()
  const name = await fullname()
  const allo = name && isString(name) ? `'Allo ${name.split(' ')[0]}! ` : "'Allo! "
  console.log(chalk.yellow(`${allo}`))
}

/*
 * 进程退出时候展示
 * */

export function byebye(): void {
  console.log()
  console.log(yosay('Bye from us!', { maxLength: 25 }))
}

/*
 * 创建host的时候 host已有
 * */

export function allReadyHave(): void {
  console.log()
  console.log(chalk.yellow(`该host已存在！`))
}

/*
 * 没有该项目组
 * */

export function noThisGroup(groupName: string): void {
  console.log()
  console.log(chalk.yellow(`${groupName} 项目组不存在！`))
}

/*
 * 项目组下没有项目
 * */

export function noProjects(groupName: string): void {
  console.log()
  console.log(chalk.yellow(`${groupName} 下没有项目！`))
}

/*
 * 项目组下没有项目
 * */

export function noTags(): void {
  console.log()
  console.log(chalk.yellow(`该项目没有发布的版本！`))
}

/*
 * 项目组下没有项目
 * */

export function errorMessage(): void {
  console.log()
  console.log(chalk.yellow(`拉取项目失败！`))
}

/*
 * 已有该文件夹的名称
 * */

export function alreadyHave(projectName: string): void {
  console.log()
  console.log(chalk.yellow(`当前目录已有名为 ${projectName} 的文件夹！`))
}

/*
 * 展示info信息
 * */

export function showInfo(): void {
  const pkg = require(`${getCurrentRoot()}/package.json`)
  const hostList = configGet('hostList')
  const platform = getNowHost()
  const { host, group, token } = getNowToken()
  console.log()
  console.log(`  Pangumanito v${pkg.version}`)
  console.log()
  console.log(`  Pangumanito configStore info:`)
  hostList.forEach(data => {
    const value = data.value
    const platValue = configGet(value)
    console.log(`    ${value}:`)
    if (platValue.length) {
      platValue.forEach(item => {
        console.log(`      host:${item.host}`)
      })
    } else {
      console.log(`      host:null`)
    }
  })
  console.log()
  console.log(`  User choose platform info:`)
  console.log(`    platform:`)
  console.log(`      ${platform}`)
  console.log(`    message:`)
  console.log(`      host: ${host}`)
  console.log(`      group: ${group}`)
  console.log(`      token: ${token}`)
}

/*
 * 下载反馈
 * */

export function downloadInter(success: boolean): void {
  console.log()
  console.log(chalk.yellow(`下载${success ? '成功' : '失败'}!`))
}
