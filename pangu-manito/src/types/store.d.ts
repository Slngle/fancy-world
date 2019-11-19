type hostType = 'gitlab' | 'github' | 'npm'

type storeKeyType = 'hostList' | 'github' | 'gitlab' | 'npm' | 'currentHost' | 'currentToken'

interface platform {
  platform: hostType
}

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
