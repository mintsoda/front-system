import axios from "axios";
import qs from "qs";
import storage from "../utils/storage";
import {message} from "antd";
axios.defaults.timeout = 8000
// axios.defaults.withCredentials = true // 让ajax携带cookie

// 请求拦截
axios.interceptors.request.use(
    config => {
        let token = storage.get('token');
        if (token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
            console.log('请求带上token',token)
            config.headers['authorization'] = token;
        }
        return config;
    },
    err => {
        console.log("请求超时");
        return Promise.reject(err);
    }
);

// 响应拦截
axios.interceptors.response.use(
    data => {
        return data;
    },
    err => {
        if (err.response) {
            switch (err.response.status) {
                case 401:
                    message.error('登录失效，请重新登录！');
                    window.location.href = '/login'
            }
            if(err.response.data&&err.response.data.error){
                if(err.response.data.error.validate){
                    let tips = err.response.data.error.validate[0].message;
                    message.error(tips);
                }
                if(err.response.data.error.tips){
                    message.error(err.response.data.error.tips);
                }
            }
        }
        return Promise.reject(err);
    }
);
const fetch = ({ url, body, type }) => {
    if (type === 'POST') {
        return axios.post(url, qs.stringify((body)))
    } else if (type === 'GET') {
        return axios.get(url, { params: body })
    }
}
export default fetch
