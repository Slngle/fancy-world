import { getNowToken } from '../../configStore'
import ora from 'ora'
import Npm from '../../utils/npm/node-npm'

export function connect(): any {
  const { host, token, group: organization } = getNowToken()
  const api = new Npm(host, organization, token)

  return {
    Tags: {
      all: async (packageName: string): Promise<any> => {
        const spinner = ora('start loading groups...')
        spinner.start()
        const data = await api.Tags.all({ packageName })
        spinner.stop()
        return data
      }
    },
    Groups: {
      search: async (): Promise<any> => {
        const spinner = ora('start search groups...')
        spinner.start()
        const data = await api.Groups.search()
        spinner.stop()
        return data
      }
    }
  }
}
