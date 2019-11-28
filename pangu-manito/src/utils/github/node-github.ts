import Groups from './github-groups'
import Tags from './github-tags'
import Repositories from './github-repositories'
import RepositoryFiles from './github-repositoryFiles'

export default class NodeGithub {
  private userName: string
  private token: string
  public Groups
  public Projects
  public Repositories
  public RepositoryFiles
  public Tags

  constructor(userName, token) {
    this.userName = userName
    this.token = token
    this.Groups = (() => {
      return this.GroupsFn()
    })()
    this.Projects = (() => {
      return this.ProjectsFn()
    })()
    this.Repositories = (() => {
      return this.RepositoriesFn()
    })()
    this.RepositoryFiles = (() => {
      return this.RepositoryFilesFn()
    })()
    this.Tags = (() => {
      return this.TagsFn()
    })()
  }

  private GroupsFn() {
    const api = new Groups(this.userName, this.token)
    return {
      async search() {
        return await api.search()
      },
      async show() {
        return await api.show()
      }
    }
  }

  private ProjectsFn() {}

  private RepositoriesFn() {
    const api = new Repositories(this.userName, this.token)
    return {
      async tree(projectName: string, sha: string) {
        return await api.tree(projectName, sha)
      }
    }
  }

  private RepositoryFilesFn() {
    const api = new RepositoryFiles(this.userName, this.token)
    return {
      async show(projectName: string, sha: string) {
        return await api.show(projectName, sha)
      }
    }
  }

  private TagsFn() {
    const api = new Tags(this.userName, this.token)
    return {
      async all(projectName: string) {
        return await api.all(projectName)
      }
    }
  }
}
