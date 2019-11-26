import {
  chooseActions,
  choosePlatform,
  chooseTokenSingle,
  configStoreQes,
  getMessage,
  resetQur
} from '../libs/questions-part'
import { configGet, configSet, resetConfig } from '../configStore'
import { alreadyHaveTokens, noTokenList, showInfo } from '../libs/interaction-part'

async function chooseDefault(list: any[]) {
  if (list && list.length) {
    // 有token集
    const { index } = await chooseTokenSingle(list)
    configSet('currentToken', index)
    showInfo()
  } else {
    // 提示没有token集
    noTokenList()
  }
}

async function add(list: any[]) {
  const { host, group, token } = await getMessage()
  let alreadyHave = false
  list.forEach(data => {
    if (host == data.host && group == data.group) {
      alreadyHave = true
    }
  })
  if (alreadyHave) {
    alreadyHaveTokens()
  } else {
    list.push({ host, group, token })
    const platform = configGet('currentHost')
    configSet(platform, list)
  }
}

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
    const { platform } = await choosePlatform()
    configSet('currentHost', platform)
    const list = configGet(platform)
    if (action == 'add') {
      await add(list)
    } else if (action == 'delete') {
    } else if (action == 'edit') {
    } else if (action == 'chooseDefault') {
      await chooseDefault(list)
    }
  }
}
