type hostType = 'gitlab' | 'github'

type storeKeyType = 'hostList' | 'github' | 'gitlab' | 'currentHost' | 'currentToken'

interface gitInter {
  host: string
  token: string
  group: string
}

interface readFileInter {
  err: any
  paths: any
}

interface hostInter {
  name: string
  value: hostType
}
