import { mkdir, writeFile } from '../../utils/file-helper'

/*
 * 连接api
 * */
export function connectHost(): any {
  const { connect } = require('./npm-connect')
  return connect()
}

/*
 * 选择拉取项目的东西
 * */
export async function chooseProject() {
  const api = connectHost()
  await api.Groups.search()
}
