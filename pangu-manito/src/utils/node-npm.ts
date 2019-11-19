export default class Npm {
  userName: string
  host: string
  organization: string

  constructor(host, organization, userName) {
    this.userName = userName
    this.host = host
    this.organization = organization
  }
}
