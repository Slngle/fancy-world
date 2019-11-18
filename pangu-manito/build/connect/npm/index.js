'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
/*
 * 连接api
 * */
function connectHost() {
  const { connect } = require('./npm-connect')
  return connect()
}
exports.connectHost = connectHost
