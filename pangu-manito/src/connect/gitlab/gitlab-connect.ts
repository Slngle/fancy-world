import { getNowToken } from '../../configStore'
import { Gitlab } from 'gitlab'

export function connect(): any {
  const { host, token } = getNowToken()
  const api = new Gitlab({
    token,
    host
  })
  return {
    Projects: {
      all: payload => {
        return api.Projects.all(payload)
      }
    },
    Groups: {
      all: (payload: object): any => {
        return api.Groups.all(payload)
      },
      search: (nameOrPath: string): any => {
        return api.Groups.search(nameOrPath)
      }
    }
  }
}
