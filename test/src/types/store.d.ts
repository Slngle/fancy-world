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

interface chooseMessage {
  projectId: string | number
  ref: string | number
  folder: string
}

interface hostInter {
  name: string
  value: hostType
}
