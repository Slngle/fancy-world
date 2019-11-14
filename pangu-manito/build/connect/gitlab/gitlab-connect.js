"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const configStore_1 = require("../../configStore");
const gitlab_1 = require("gitlab");
function connect() {
    const { host, token } = configStore_1.getNowToken();
    const api = new gitlab_1.Gitlab({
        token,
        host
    });
    return {
        Projects: {
            all: payload => {
                return api.Projects.all(payload);
            }
        },
        Groups: {
            all: (payload) => {
                return api.Groups.all(payload);
            },
            search: (nameOrPath) => {
                return api.Groups.search(nameOrPath);
            }
        }
    };
}
exports.connect = connect;
