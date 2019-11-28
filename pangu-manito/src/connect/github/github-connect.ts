import { getNowToken } from '../../configStore'
import ora from 'ora'
import NodeGithub from '../../utils/github/node-github'

export function connect(): any {
  const { token, group } = getNowToken()
  const api = new NodeGithub(group, token)
  return {
    Projects: {
      all: async (payload): Promise<any> => {
        const spinner = ora('start loading projects...')
        spinner.start()
        // const data = await api.Projects.all(payload)
        spinner.stop()
        // return data
      }
    },
    Repositories: {
      tree: async (projectName: string, sha: string): Promise<any> => {
        const spinner = ora('start loading projects file...')
        spinner.start()
        const data = await api.Repositories.tree(projectName, sha)
        spinner.stop()
        return data
      }
    },
    RepositoryFiles: {
      show: async (projectName: string | number, sha: string, fileName: string) => {
        const spinner = ora(`start download ${fileName}`)
        spinner.start()
        const data = await api.RepositoryFiles.show(projectName, sha)
        spinner.stop()
        return data
      }
    },
    Tags: {
      all: async (projectName: string): Promise<any> => {
        const spinner = ora('start loading groups...')
        spinner.start()
        const data = await api.Tags.all(projectName)
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
      },
      show: async (): Promise<any> => {
        const spinner = ora('show project under groups...')
        spinner.start()
        const data = await api.Groups.show()
        spinner.stop()
        return data
      }
    }
  }
}
