import fetch from "./ajax"

export const DEBUG = false // 是否开发模式
// const ROOT_DEV ='/api'
const ROOT_DEV = 'http://192.168.21.3:7000' // 测试地址
const ROOT = 'http://dmio-api.360che.com'
const baseUrl = DEBUG ? ROOT_DEV : ROOT

export default {
    //登录获取左侧菜单
    menuList (json) {
        return fetch({
            url: `${baseUrl}/login`,
            body: json,
            type: 'POST'
        })
    },
}
