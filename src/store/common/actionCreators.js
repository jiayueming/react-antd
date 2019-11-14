import { ACTION_LOGIN, ACTION_REGISTER, ACTION_LOGINOUT } from './constants.js'
import http from '@/api/http.js'

export const receiveLogin = ( dataName, data) => {
    return {
        type: ACTION_LOGIN,
        [dataName]: data
    }
}

/**
 * 
 * 封装个通用的 actionCreate
 * @params: url<string> 接口路径
 * @params: actionType<string> action.type
 * @params: subreddit<string> 数据名称
 * @params: data<object> 数据
*/
const receive = (typeName, dataName, data) => {
    return {
        type: typeName,
        [dataName]: data
    }
}
/**
 * 
 * @param {请求的url} url 
 * @param {action} actionType 
 * @param {数据名称} subreddit 
 * @param {数据data} data 
 */
function fetchPosts(url, actionType, subreddit, data) { // +
    return dispatch => {
        dispatch(receive(actionType, subreddit, '暂无数据'))
        return http.post(url, data)
            .then(res => {
                dispatch(receive(actionType, subreddit, res))
            })
    }
}
// 登陆
export const handleLogin = (data) => {
	return (dispatch)=>{
		dispatch(fetchPosts('/login', ACTION_LOGIN, 'loginData', data)) // dispatch切换store
	}
}
// 注册
export const hanleRegister = (data) => {
    return (dispatch) => {
        dispatch(fetchPosts('/register', ACTION_REGISTER,'reigsterData', data))
    }
}
export const onLogout = (data) => { // + 添加退出事件。
    return (dispatch) => {
        dispatch(fetchPosts('/logout', ACTION_LOGINOUT, 'logoutData', data))
    }
}
