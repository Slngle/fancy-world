import { configStoreQes } from '../libs/questions-part'
import { resetConfig } from '../configStore'

export async function config() {
  const config = await configStoreQes()
  if (config == 'reset') {
    //重置configStore
    resetConfig()
  } else if (config == 'gitlab-auth') {
    //修改
  }
}
