import { axios } from '@/utils/request'

// const EnergyApi = {
//     EnergyMonitoring: '/auth/login',
//     Logout: '/auth/logout',
//     Register: '/auth/register',
//     SendSms: '/account/sms',
//     twoStepCode: '/auth/2step-code',
//     // get my info
//     UserInfo: '/user/info',
//     UserNav: '/user/nav'
//   }

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
    url: '/dashboard/energymonitoring',
    method: 'get',
    data: parameter
  })
}
