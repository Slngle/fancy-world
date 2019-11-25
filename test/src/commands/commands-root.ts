import program from 'commander'
import { getCurrentCWD, getCurrentRoot } from '../utils/file-helper'
import { init } from './init'
import { create } from './create'
import { config } from './config'
import { show } from './show'
const pkg = require(`${getCurrentRoot()}/package.json`)

export function commands(args: any): void {
  program.version(pkg.version, '-V, --version').usage('<command> [options]')
  program
    .command('init')
    .description('当前目录下初始化')
    .action(async function(): Promise<any> {
      await init(`${getCurrentCWD()}`)
    })
  program
    .command('create <projectName>')
    .description('创建<projectName>并在该目录下初始化')
    .action(async function(projectName): Promise<any> {
      await create(`${getCurrentCWD()}`, `${projectName}`)
    })
  program
    .command('info')
    .description('展示configStore配置信息')
    .action(async function(): Promise<any> {
      await show()
    })
  program
    .command('config')
    .description('配置configStore')
    .action(async function(): Promise<any> {
      await config()
    })
  program.parse(args)
}
