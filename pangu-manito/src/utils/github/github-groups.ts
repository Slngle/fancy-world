import { requestGet } from './request'

export default class Groups {
  userName: string
  token: string

  constructor(userName, token) {
    this.userName = userName
    this.token = token
  }

  search() {}
  async show() {
    const { userName, token } = this
    const data = await requestGet(`/users/${userName}/repos?access_token=${token}`)
    if (data && data.length) {
      const list: Array<any> = []
      data.forEach(item => {
        list.push({
          id: item.name,
          realId: item.id,
          name: item.name,
          description: item.description
        })
      })
      return list
    } else {
      return null
    }
  }
}
