'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const configStore_1 = require('../../configStore')
// /*
//  * 进行身份验证
//  * */
// function setGithubCredentials() {
//   const { token, group } = getNowToken()
//   octokit.authenticate(
//     extend(
//       {
//         type: 'basic'
//       },
//       { token, group }
//     )
//   )
// }
// /*
//  * 获取token
//  * */
// async function registerAuthToken(): Promise<any> {
//   const spinner = ora('start loading projects...')
//   spinner.start()
//   try {
//     const response = await octokit.authorization.create({
//       scopes: ['user', 'public_repo', 'repo', 'repo:status'],
//       note: 'pangu, the command-line tool for initalizing Git repos'
//     })
//     return response.data.token
//   } catch (ex) {
//     return ''
//   } finally {
//     spinner.stop()
//   }
// }
function connect() {
  const { token, group } = configStore_1.getNowToken()
  const octokit = require('@octokit/rest')()
  octokit()
}
exports.connect = connect
