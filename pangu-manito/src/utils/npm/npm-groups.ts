import { getNowToken } from '../../configStore'

export default class Groups {
  async search() {
    const { host, token, group } = getNowToken()
    // request('https://www.npmjs.com/~yjm')
  }
}
