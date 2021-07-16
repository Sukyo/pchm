import { getLocal, removeLocal } from '@/utils/local';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { ElMessage as Message } from 'element-plus';
import router from '@/router';
const config: AxiosRequestConfig = {
    method: 'GET',
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
}
const _fetch: AxiosInstance = axios.create(config)
_fetch.interceptors.request.use(function (config: AxiosRequestConfig): any {
    // Do something before request is sent
    config.headers = {
        token: getLocal('token')
    }
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error); // 会走.catch
});

// Add a response interceptor
_fetch.interceptors.response.use(function (response: AxiosResponse): any {
    // Do something with response data
    if (response.status === 200) {
        // 如果是206 token过期 跳转至登录页
        if (response.data.code === 206) {
            Message({
                type: 'error',
                message: '会话已过期,请重新登录',
                duration: 2000
            })
            removeLocal('token');
            // 删除token
            router.push('/login')
            // return Promise.reject(new Error(response.data)) //会报错
        }
        return response.data;
    } else {
        return Promise.reject(response.data); // 会走.catch
    }
}, function (error) {
    // Do something with response error
    return Promise.reject(error); // 会走.catch
})

/**
 * 将axios实例再封装一层promise,将响应结果做为resolve返回出来
 * 手动调用实例的catch,抓所有axios的Promise.reject在控制台抛出的爆红
 * 所有的Promise.reject都会走这个catch,我们对错误err不做任何输出或其它处理,爆红就没了
 */

const _ajax = (obj: AxiosRequestConfig): Promise<any> => {
    return new Promise((resolve, rejects) => {
        window.app!.$loading.show();
        return _fetch(obj) // 这里的_fetch是axios.create()创建的axios实例对象
        .then(res => {
                window.app!.$loading.hide();
                resolve(res)
            })
            .catch(err => {
                // console.log(err)
                // reject(err)
                // console.log(err.messagae)
                // 这里对错误啥也不干,控制台就不爆红了
            })
    });
}
export default _ajax;