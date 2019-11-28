import { requestGet } from './request'

export default class Repositories {
  userName: string
  token: string

  constructor(userName, token) {
    this.userName = userName
    this.token = token
  }

  async tree(projectName, sha) {
    const { userName, token } = this
    const data = await requestGet(
      `/repos/${userName}/${projectName}/git/trees/${sha}?access_token=${token}`
    )
    const tree = data && data.tree
    if (tree && tree.length) {
      const list: Array<any> = []
      tree.forEach(item => {
        list.push({ type: item.type, sha: item.sha, path: item.path })
      })
      return list
    } else {
      return null
    }
  }
}
