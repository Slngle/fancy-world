import {
  chooseActions,
  choosePlatform,
  chooseTokenSingle,
  getMessage
} from '../libs/questions-part'
import { configGet, configSet } from '../configStore'
import { alreadyHaveTokens, noTokenList, showInfo } from '../libs/interaction-part'

/*
 * 选择默认的tokens集合
 * */
async function chooseDefault(list: any[]) {
  if (list && list.length) {
    // 有token集
    const { index } = await chooseTokenSingle(list, '请选择tokens集合')
    configSet('currentToken', index)
    showInfo()
  } else {
    // 提示没有token集
    noTokenList()
  }
}

/*
 * 添加一组tokens集合
 * */
async function add(list: any[], platform: hostType) {
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
    configSet(platform, list)
    showInfo()
  }
}

/*
 * 删除一组tokens集合
 * */
async function deleteTokens(list: any[], platform: hostType) {
  if (list && list.length) {
    // 有token集
    const { index } = await chooseTokenSingle(list, '请选择tokens集合')
    // 删除索引（index）的tokens集合
    list.splice(index, 1)
    configSet(platform, list)
    showInfo()
  } else {
    // 提示没有token集
    noTokenList()
  }
}

/*
 * 修改一组tokens
 * */
async function edit(list: any[], platform: hostType) {
  if (list && list.length) {
    // 有token集
    const { index } = await chooseTokenSingle(list, '请选择tokens集合')
    // 删除索引（index）的tokens集合
    const { host, group, token } = await getMessage(platform)
    list.splice(index, 1, { host, group, token })
    configSet(platform, list)
    showInfo()
  } else {
    // 提示没有token集
    noTokenList()
  }
}

export async function config() {
  // 修改
  const action = await chooseActions()
  const { platform } = await choosePlatform()
  const list = configGet(platform)
  if (action == 'add') {
    await add(list, platform)
  } else if (action == 'delete') {
    await deleteTokens(list, platform)
  } else if (action == 'edit') {
    await edit(list, platform)
  } else if (action == 'chooseDefault') {
    configSet('currentHost', platform)
    await chooseDefault(list)
  }
}
