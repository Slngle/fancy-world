type hostType = 'gitlab' | 'github'

type storeKeyType = 'hostList' | 'github' | 'gitlab' | 'currentHost' | 'currentToken'

interface gitInter {
  host: string
  token: string
  group: string
}

interface hostInter {
  name: string
  value: hostType
}
