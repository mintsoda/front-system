import fetch from "./ajax"

export const DEBUG = true // 是否开发模式
// const ROOT_DEV ='/api'
const ROOT_DEV = 'http://127.0.0.1:7002' // 测试地址
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
    // 获取
    getDepartment (json) {
        return fetch({
            url: `${baseUrl}/getDepartment`,
            body: json,
            type: 'GET'
        })
    },
    // 发布bug
    publishBug (json){
        return fetch({
            url: `${baseUrl}/publishBug`,
            body: json,
            type: 'POST'
        })
    },
    // 获取bug列表
    getBugList(json){
        return fetch({
            url: `${baseUrl}/getBugList`,
            body: json,
            type: 'GET'
        })
    },
    // 获取bug详情
    getBugDetail(json){
        return fetch({
            url: `${baseUrl}/getBugDetail`,
            body: json,
            type: 'GET'
        })
    },
    // 获取bug对应的答案
    getBugAnswers(json){
        return fetch({
            url: `${baseUrl}/getBugAnswers`,
            body: json,
            type: 'GET'
        })
    },
    // 回答问题
    setBugAnswer(json){
        return fetch({
            url: `${baseUrl}/setBugAnswer`,
            body: json,
            type: 'POST'
        })
    },
    // 设为答案
    setFinallyAnswer(json){
        return fetch({
            url: `${baseUrl}/setFinallyAnswer`,
            body: json,
            type: 'POST'
        })
    }
}
