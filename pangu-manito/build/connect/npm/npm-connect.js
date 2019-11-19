"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const configStore_1 = require("../../configStore");
const node_npm_1 = __importDefault(require("../../utils/node-npm"));
function connect() {
    const { host, token, group } = configStore_1.getNowToken();
    const api = new node_npm_1.default(host, group, token);
    return;
    //
    // return {
    //   Projects: {
    //     all: async (payload): Promise<any> => {
    //       const spinner = ora('start loading projects...')
    //       spinner.start()
    //       const data = await api.Projects.all(payload)
    //       spinner.stop()
    //       return data
    //     }
    //   },
    //   Repositories: {
    //     tree: async (projectId: string | number, options): Promise<any> => {
    //       const spinner = ora('start loading projects file...')
    //       spinner.start()
    //       const data = await api.Repositories.tree(projectId, {
    //         path: options.path,
    //         ref: options.ref
    //       })
    //       spinner.stop()
    //       return data
    //     }
    //   },
    //   RepositoryFiles: {
    //     show: async (projectId: string | number, filePath: string, ref: string, fileName: string) => {
    //       const spinner = ora(`start download ${fileName}`)
    //       spinner.start()
    //       const data = await api.RepositoryFiles.show(projectId, filePath, ref)
    //       spinner.stop()
    //       return data
    //     }
    //   },
    //   Tags: {
    //     all: async (projectId: string | number): Promise<any> => {
    //       const spinner = ora('start loading groups...')
    //       spinner.start()
    //       const data = await api.Tags.all(projectId)
    //       spinner.stop()
    //       return data
    //     }
    //   },
    //   Groups: {
    //     all: async (payload: object): Promise<any> => {
    //       const spinner = ora('start loading groups...')
    //       spinner.start()
    //       const data = await api.Groups.all(payload)
    //       spinner.stop()
    //       return data
    //     },
    //     search: async (nameOrPath: string): Promise<any> => {
    //       const spinner = ora('start search groups...')
    //       spinner.start()
    //       const data = await api.Groups.search(nameOrPath)
    //       spinner.stop()
    //       return data
    //     },
    //     show: async (groupId: string | number): Promise<any> => {
    //       const spinner = ora('show project under groups...')
    //       spinner.start()
    //       const data = await api.Groups.show(groupId)
    //       spinner.stop()
    //       return data
    //     }
    //   }
    // }
}
exports.connect = connect;
