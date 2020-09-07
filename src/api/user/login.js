import { axios } from '@/utils/request'

const UserApi = {
  Login: '/auth/login',
  Logout: '/auth/logout',
  Register: '/auth/register',
  SendSms: '/account/sms',
  twoStepCode: '/auth/2step-code',
  // get my info
  UserInfo: '/user/info',
  UserNav: '/user/nav'
}

/**
 * login func
 * parameter: {
 *     username: '',
 *     password: '',
 *     remember_me: true,
 *     captcha: '12345'
 * }
 * @param parameter
 * @returns {*}
 */
export function login (parameter) {
  return axios({
    url: UserApi.Login,
    method: 'post',
    data: parameter
  })
}

export function getInfo (parameter) {
  return axios({
    url: UserApi.UserInfo,
    method: 'get',
    params: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function getCurrentUserNav (token) {
  return axios({
    url: UserApi.UserNav,
    method: 'get'
  })
}

export function logout () {
  return axios({
    url: UserApi.Logout,
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function getSmsCaptcha (parameter) {
  return axios({
    url: UserApi.SendSms,
    method: 'post',
    data: parameter
  })
}

/**
 * get user 2step code open?
 * @param parameter {*}
 */
export function get2step (parameter) {
  return axios({
    url: UserApi.twoStepCode,
    method: 'post',
    data: parameter
  })
}
