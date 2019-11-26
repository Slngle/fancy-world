import { configStoreQes, resetQur } from '../libs/questions-part'
import { resetConfig } from '../configStore'
import { showInfo } from '../libs/interaction-part'

export async function reset(): Promise<any> {
  const config = await configStoreQes()
  if (config == 'reset') {
    // 重置configStore
    const reset = await resetQur()
    if (reset) {
      resetConfig()
      showInfo()
    }
  }
}
