"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * 连接api
 * */
function connectHost() {
    const { connect } = require('./github-connect');
    return connect();
}
exports.connectHost = connectHost;
