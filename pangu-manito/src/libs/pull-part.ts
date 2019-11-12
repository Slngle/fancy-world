import { getNowToken } from '../configStore'
import { setTokenInquirer } from './questions-part'

export async function getToken(): Promise<gitInter> {
  const nowToken: gitInter = getNowToken()
  if (nowToken.token) {
    // 如果有直接返回当前的
    return nowToken
  } else {
    // 如果没有直接去创建
    const { host, token, group } = await setTokenInquirer()
    return { host, token, group }
  }
}
