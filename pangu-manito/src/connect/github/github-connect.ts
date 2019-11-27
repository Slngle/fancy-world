import { getNowToken } from '../../configStore'
import { extend } from 'lodash'
import ora from 'ora'

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

export function connect() {
  const { token, group } = getNowToken()
  const octokit = require('@octokit/rest')()
  octokit()
}
