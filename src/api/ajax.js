import axios from "axios";
// import qs from "qs";
axios.defaults.timeout = 8000
// axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

// 请求拦截
axios.interceptors.request.use(
    config => {
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
        console.log('请求错误：' + err);
        return Promise.reject(err);
    }
);
const fetch = ({ url, body, type }) => {
    if (type === 'POST') {
        return axios.post(url, JSON.stringify(body))
    } else if (type === 'GET') {
        return axios.get(url, { params: body })
    }
}
export default fetch
