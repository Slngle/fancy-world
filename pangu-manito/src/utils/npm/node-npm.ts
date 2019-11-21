import Groups from './npm-groups'
import Tags from './npm-tags'

export default class Npm {
  userName: string
  host: string
  organization: string

  constructor(host, organization, userName) {
    this.userName = userName
    this.host = host
    this.organization = organization
  }

  Groups = (function() {
    const api = new Groups()
    return {
      async search() {
        return await api.search()
      }
    }
  })()

  Tags = (function() {
    const api = new Tags()
    return {
      async all(payload: projectParams) {
        return await api.all(payload)
      }
    }
  })()
}
