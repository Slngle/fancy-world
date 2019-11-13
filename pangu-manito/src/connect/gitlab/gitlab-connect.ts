import { getNowToken } from '../../configStore'
import { Gitlab } from 'gitlab'

export function connect(): any {
  const { host, token } = getNowToken()
  const api = new Gitlab({
    token,
    host
  })
  return api
  // {
  //     Projects: {
  //         all: () => {
  //             return api.Projects.all()
  //         }
  //     },
  //     groups: {}
  // }
}
