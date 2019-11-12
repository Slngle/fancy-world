import updateNotifier from 'update-notifier'
import { getCurrentRoot } from '../utils/file-helper'
import figlet from 'figlet'
import chalk from 'chalk'
import yosay from 'yosay'
import fullname from 'fullname'
import { isString } from 'lodash'

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
