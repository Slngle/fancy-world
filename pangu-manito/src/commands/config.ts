import { configStoreQes } from '../libs/questions-part'
import { resetConfig } from '../configStore'

export async function config() {
  const config = await configStoreQes()
  if (config == 'reset') {
    resetConfig()
  } else if (config == 'gitlab-auth') {
  }
}
