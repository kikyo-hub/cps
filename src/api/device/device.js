import { axios } from '@/utils/request'

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
export function getAll (parameter) {
  return axios({
    url: '/device/login',
    method: 'get',
    data: parameter
  })
}

export function getSmsCaptcha (parameter) {
  return axios({
    url: '/device',
    method: 'post',
    data: parameter
  })
}

export function getInfo (parameter) {
  return axios({
    url: '/device/info',
    method: 'get',
    params: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function getCurrentUserNav (token) {
  return axios({
    url: '/device/nav',
    method: 'get'
  })
}

export function logout () {
  return axios({
    url: '/device/logout',
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

/**
 * get user 2step code open?
 * @param parameter {*}
 */
export function get2step (parameter) {
  return axios({
    url: '/device',
    method: 'post',
    data: parameter
  })
}
