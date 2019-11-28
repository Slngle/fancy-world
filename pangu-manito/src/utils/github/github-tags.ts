import { requestGet } from './request'

export default class Tags {
  userName: string
  token: string

  constructor(userName, token) {
    this.userName = userName
    this.token = token
  }
  async all(projectName: string) {
    const { userName, token } = this
    const data = await requestGet(`/repos/${userName}/${projectName}/tags?access_token=${token}`)
    const list: Array<any> = []
    if (data && data.length) {
      data.forEach(item => {
        list.push({
          name: item.name,
          value: item.commit && item.commit.sha
        })
      })
      return list
    } else {
      return null
    }
  }
}
