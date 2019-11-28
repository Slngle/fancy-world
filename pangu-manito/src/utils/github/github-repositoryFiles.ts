import { requestGet } from './request'

export default class RepositoryFiles {
  userName: string
  token: string

  constructor(userName, token) {
    this.userName = userName
    this.token = token
  }
  async show(projectName, sha) {
    const { userName, token } = this
    const data = await requestGet(
      `/repos/${userName}/${projectName}/git/blobs/${sha}?access_token=${token}`
    )
    if (data && data.content) {
      return {
        content: data.content
      }
    } else {
      return {
        content: ''
      }
    }
  }
}
