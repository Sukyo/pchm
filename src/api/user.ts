import _ajax from './request';
const login = (data: any) => {
    return _ajax({
        url: '/login',
        method: 'POST',
        data
    })
}
export {
    login
}