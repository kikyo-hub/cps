<template>
  <a-config-provider :locale="locale">
    <div id="app">
      <router-view v-if="isRouterAlive">
      </router-view></div>
  </a-config-provider>
</template>

<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import { AppDeviceEnquire } from '@/utils/mixin'

export default {
  name: 'App',
  provide () {
     return {
       reload: this.reload
     }
  },
  mixins: [AppDeviceEnquire],
  data () {
    return {
      locale: zhCN,
      isRouterAlive: true
    }
  },
  methods: {
    reload () {
       this.isRouterAlive = false
       this.$nextTick(function () {
          this.isRouterAlive = true
       })
    }
  },
  components: {
  },
  mounted () {

  }
}
</script>
