import { chooseActions, choosePlatform, configStoreQes, resetQur } from '../libs/questions-part'
import { configSet, resetConfig } from '../configStore'
import { showInfo } from '../libs/interaction-part'

export async function config() {
  const config = await configStoreQes()
  if (config == 'reset') {
    // 重置configStore
    const reset = await resetQur()
    if (reset) {
      resetConfig()
    }
  } else if (config == 'edit') {
    // 修改
    const action = await chooseActions()
    if (action == 'add') {
    } else if (action == 'delete') {
    } else if (action == 'edit') {
    } else if (action == 'chooseDefault') {
      const { platform } = await choosePlatform()
      configSet('currentHost', platform)
      showInfo()
    }
  }
}
