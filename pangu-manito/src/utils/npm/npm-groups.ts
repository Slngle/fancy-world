import { getNowToken } from '../../configStore'
import { getNpmProjectAndMessage } from './npm-spider'

export default class Groups {
  async search(): Promise<any> {
    const { host, token, group } = getNowToken()
    return await getNpmProjectAndMessage(host, token, group)
  }
}
