import { mkdir, writeFile } from '../../utils/file-helper'

/*
 * 连接api
 * */
export function connectHost(): any {
  const { connect } = require('./github-connect')
  return connect()
}
