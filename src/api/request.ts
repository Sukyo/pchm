import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
const config: AxiosRequestConfig = {
    method: 'GET',
    baseURL: import.meta.env.BASE_URL,
    withCredentials: true
}
const _fetch: AxiosInstance = axios.create(config)
_fetch.interceptors.request.use(function (config: AxiosRequestConfig): any {
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
_fetch.interceptors.response.use(function (response: AxiosResponse): any {
    // Do something with response data
    return response;
}, function (error) {
    // Do something with response error
    return Promise.reject(error);
})

/**
 * 将axios实例再封装一层promise,将响应结果做为resolve返回出来
 * 手动调用实例的catch,抓所有axios的Promise.reject在控制台抛出的爆红
 * 所有的Promise.reject都会走这个catch,我们对错误err不做任何输出或其它处理,爆红就没了
 */

const _ajax = (obj: AxiosRequestConfig): Promise<unknown> => {
    return new Promise((resolve, rejects) => {
        return _fetch(obj) // 这里的_fetch是axios.create()创建的axios实例对象
            .then(res => {
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