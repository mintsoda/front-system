import fetch from "./ajax"

export const DEBUG = true // 是否开发模式
// const ROOT_DEV ='/api'
const ROOT_DEV = 'http://127.0.0.1:7001' // 测试地址
const ROOT = 'http://dmio-api.360che.com'
const baseUrl = DEBUG ? ROOT_DEV : ROOT

export default {
    //注册
    register (json) {
        return fetch({
            url: `${baseUrl}/register`,
            body: json,
            type: 'POST'
        })
    },
    // 登录
    login (json) {
        return fetch({
            url: `${baseUrl}/login`,
            body: json,
            type: 'GET'
        })
    },
    // 获取标签
    getTags (json) {
        return fetch({
            url: `${baseUrl}/getTags`,
            body: json,
            type: 'GET'
        })
    },
    // 新增bug
    addBug (json){
        return fetch({
            url: `${baseUrl}/addBug`,
            body: json,
            type: 'POST'
        })
    }
}
