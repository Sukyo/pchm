import _ajax from './request';
interface UserInfo {
    avatar?: string
    create_time?: string
    email?: string
    id?: number
    phone?: string
    remark?: string
    role?: string
    role_id?: number
    status?: number
    update_time?: string
    username?: string
}
export interface ResponseData<T> {
    code: number;
    data: T;
    message: string;
}
const login = (data: any) => {
    return _ajax({
        url: '/login',
        method: 'POST',
        data
    })
}
const register = (data: any) => {
    return _ajax({
        url: '/register',
        method: 'POST',
        data
    })
}
const sendSms = (data: any) => {
    return _ajax({
        url: '/sendsms',
        method: 'POST',
        data,
    })
}
const logout = () => {
    return _ajax({
        url: '/logout',
    })
}
const getUserInfo = (): Promise<ResponseData<UserInfo>> => {
    return _ajax({
        url: '/info',
    })
}
export {
    UserInfo,
    getUserInfo,
    logout,
    login,
    register,
    sendSms,
}