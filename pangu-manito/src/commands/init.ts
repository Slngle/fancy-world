import { showCliName, showUserAllo } from '../libs/interaction-part'
import { getToken } from '../libs/pull-part'

export async function init(folder: string): Promise<any> {
  showCliName()
  await showUserAllo()
  const { host, token, group } = await getToken()
  if (host && token && group) {
  }
}
