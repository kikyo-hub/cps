import Vue from 'vue'
import router from './router'
import store from './store'

import NProgress from 'nprogress' // progress bar
import '@/components/NProgress/nprogress.less' // progress bar custom style
import notification from 'ant-design-vue/es/notification'
 import { setDocumentTitle, domTitle } from '@/utils/domUtil'
import { ACCESS_TOKEN } from '@/store/mutation-types'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['login', 'register', 'registerResult'] // no redirect whitelist
const defaultRoutePath = '/homepage/workplace'

router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  to.meta && (typeof to.meta.title !== 'undefined' && setDocumentTitle(`${to.meta.title} - ${domTitle}`))
  // console.log('Vue.ls.get(ACCESS_TOKEN)', Vue.ls.get(ACCESS_TOKEN))
  // store.replaceState(Object.assign({}, store.state, JSON.parse(sessionStorage.getItem('store'))))
  // console.log(to, from)
  if (Vue.ls.get(ACCESS_TOKEN)) {
      /* has token */
      if (to.path === '/user/login') {
        next({ path: defaultRoutePath })
        NProgress.done()
      } else {
      // console.log('store.getters.roles.length', store.getters.roles.length)
      if (store.getters.roles.length === 0) {
        // 把sessionStorage的id放到state中
        if (sessionStorage.getItem('store')) {
        store.commit('SET_USERID', JSON.parse(sessionStorage.getItem('store')))
        }
        const userid = store.getters.userid
        // console.log('query user info ', userid)
        store
          .dispatch('GetInfo', { userid })
          .then(res => {
            const roles = res.result && res.result.roles
            // console.log('roles ', roles)
            store.dispatch('GenerateRoutes', { roles }).then(() => {
              // 根据roles权限生成可访问的路由表
              // 动态添加可访问路由表
              router.addRoutes(store.getters.addRouters)
              // 请求带有 redirect 重定向时，登录自动重定向到该地址
              const redirect = decodeURIComponent(from.query.redirect || to.path)
              if (to.path === redirect) {
                // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
                next({ ...to, replace: true })
              } else {
                // 跳转到目的路由
                next({ path: redirect })
              }
            })
          })
          .catch(() => {
            notification.error({
              message: '错误',
              description: '请求用户信息失败，请重试'
            })
            store.dispatch('Logout').then(() => {
              next({ path: '/user/login', query: { redirect: to.fullPath } })
            })
          })
      } else {
        next()
      }
    }
  } else {
    if (whiteList.includes(to.name)) {
      // 在免登录白名单，直接进入
      next()
    } else {
      next({ path: '/user/login', query: { redirect: to.fullPath } })
      NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
