import Vue from 'vue'
import { login, getInfo, logout } from '@/api/user/login'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { welcome } from '@/utils/util'
import store from '../index'

const user = {
  state: {
    token: '',
    name: '',
    userid: '',
    welcome: '',
    avatar: '',
    roles: [],
    info: {}
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, { name, welcome }) => {
      state.name = name
      state.welcome = welcome
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_INFO: (state, info) => {
      state.info = info
    },
    SET_USERID: (state, info) => {
      state.userid = info
    }
  },

  actions: {
    // 登录
    Login ({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo)
        .then(res => {
          const result = res.result
          // console.log('result', res)
          if (res.code === 0) {
            Vue.ls.set(ACCESS_TOKEN, result.token, 7 * 24 * 60 * 60 * 1000)
            commit('SET_TOKEN', result.token)
            commit('SET_USERID', result.userid)
            resolve(res)
          } else {
            reject(res)
          }
        })
        .catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo ({ commit }, userid) {
      return new Promise((resolve, reject) => {
        getInfo(userid).then(response => {
          // console.log('ceshiUserID', userid, response)
          const result = response.result
         if (response.code !== 0) {
          reject(new Error('获取用户信息失败，请联系系统后台管理员!'))
         } else if (result.roles && result.roles.length > 0) {
            // const role = result.role
            // role.permissions = result.role.permissions
            // role.permissions.map(per => {
            //   if (per.actionEntitySet != null && per.actionEntitySet.length > 0) {
            //     const action = per.actionEntitySet.map(action => { return action.action })
            //     per.actionList = action
            //   }
            // })
            // role.permissionList = role.permissions.map(permission => { return permission.permissionId })
            // commit('SET_ROLES', result.role)
            // commit('SET_INFO', result)
            commit('SET_NAME', { name: result.name, welcome: welcome() })
            commit('SET_AVATAR', result.avatar)
            commit('SET_ROLES', result.roles)
            sessionStorage.setItem('store', JSON.stringify(store.state.user.userid))
            // console.log((sessionStorage.getItem('store')))
            resolve(response)
          } else {
            reject(new Error('该用户就没有可使用的权限，请联系配置管理员!'))
          }
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    Logout ({ commit, state }) {
      return new Promise((resolve) => {
        logout(state.token).then(() => {
          resolve()
        }).catch(() => {
          resolve()
        }).finally(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          Vue.ls.remove(ACCESS_TOKEN)
          sessionStorage.removeItem('store')
        })
      })
    }

  }
}

export default user
