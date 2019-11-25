import { showCliName, showUserAllo } from '../libs/interaction-part'
import { getToken, pullCodeing } from '../libs/pull-part'

export async function init(folder: string): Promise<any> {
  showCliName() // 展示下cli的名字
  await showUserAllo() // 对你的一声问候
  const { host, token, group } = await getToken()
  if (host && token && group) {
    // 如果拿到了token等信息 就去pull code
    await pullCodeing(folder)
  }
}
