import { getNowToken } from '../../configStore'
import { Gitlab } from 'gitlab'
import ora from 'ora'

export function connect(): any {
  const { host, token } = getNowToken()
  const api = new Gitlab({
    token,
    host
  })
  return {
    Projects: {
      all: async (payload): Promise<any> => {
        const spinner = ora('start loading projects...')
        spinner.start()
        const data = await api.Projects.all(payload)
        spinner.stop()
        return data
      }
    },
    Repositories: {
      tree: async (projectId: string | number, options): Promise<any> => {
        const spinner = ora('start loading projects file...')
        spinner.start()
        const data = await api.Repositories.tree(projectId, {
          path: options.path,
          ref: options.ref
        })
        spinner.stop()
        return data
      }
    },
    RepositoryFiles: {
      show: async (projectId: string | number, filePath: string, ref: string, fileName: string) => {
        const spinner = ora(`start download ${fileName}`)
        spinner.start()
        const data = await api.RepositoryFiles.show(projectId, filePath, ref)
        spinner.stop()
        return data
      }
    },
    Tags: {
      all: async (projectId: string | number): Promise<any> => {
        const spinner = ora('start loading groups...')
        spinner.start()
        const data = await api.Tags.all(projectId)
        spinner.stop()
        return data
      }
    },
    Groups: {
      all: async (payload: object): Promise<any> => {
        const spinner = ora('start loading groups...')
        spinner.start()
        const data = await api.Groups.all(payload)
        spinner.stop()
        return data
      },
      search: async (nameOrPath: string): Promise<any> => {
        const spinner = ora('start search groups...')
        spinner.start()
        const data = await api.Groups.search(nameOrPath)
        spinner.stop()
        return data
      },
      show: async (groupId: string | number): Promise<any> => {
        const spinner = ora('show project under groups...')
        spinner.start()
        const data = await api.Groups.show(groupId)
        spinner.stop()
        return data
      }
    }
  }
}
