'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const interaction_part_1 = require('./libs/interaction-part')
const commands_root_1 = require('./commands/commands-root')
function cli(args) {
  commands_root_1.commands(args)
  process.once('exit', () => {
    interaction_part_1.byebye()
  })
  interaction_part_1.checkVersion()
}
exports.cli = cli
