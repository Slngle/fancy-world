'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
class Groups {}
class Npm {
  constructor(host, organization, userName) {
    this.userName = userName
    this.host = host
    this.organization = organization
  }
  search() {}
  Groups() {
    return {
      search: this.search
    }
  }
  Tags() {}
}
exports.default = Npm
