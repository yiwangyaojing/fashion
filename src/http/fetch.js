import axios from 'axios'
import url from '@/api/http';
axios.defaults.withCredentials = true
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
        config.headers['Content-Type'] = 'application/json;charset=UTF-8'
        return config
    }, function (error) {
        // 对请求错误做些什么
        return Promise.reject(error)
    });

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
        response.data['http'] = url;
        return response.data;
    }, function (error) {
        // 对响应错误做点什么
        this.$Message.error('网络错误');
        return Promise.reject(error.data);
    });

export default axios