import { byebye, checkVersion } from './libs/interaction-part'
import { commands } from './commands/commands-root'

export function cli(args: any): void {
  commands(args)
  process.once('exit', () => {
    byebye()
  })
  checkVersion()
}
