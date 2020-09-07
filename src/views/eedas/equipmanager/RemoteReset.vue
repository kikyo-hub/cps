<template>
  <div>
    <a-input-group compact style="display：online-block">
      <a-radio-group :options="plainOptions" :default-value="value1" @change="onChange" />
      <a-button type="primary" style="margin-left:1%;margin-top:-0.5%;" @click="remotereset" :disabled="dis" icon="reload">
        复位
      </a-button>
    </a-input-group>
    <div style="margin-top:8px;">
      <a-textarea
        placeholder="复位结果"
        :autoSize="{ minRows: 24, maxRows: 24 }"
        v-model="resultmsg"
        :disabled="true"
        style="margin-top:0%;overflowY:scroll;">
      </a-textarea>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
import { remoteReset } from '@/api/archives/MonitorEquip'
const plainOptions = ['硬件初始化', '数据初始化', '参数及数据初始化']
export default {
    components: {
    remoteReset
    },
  // eslint-disable-next-line vue/require-prop-types
  props: ['address'],
  data () {
    return {
        visible: false,
        resultmsg: '',
        value1: '',
        plainOptions,
        radiovalue: '',
        dis: false
    }
  },
  created () {
  },
  mounted () {

  },
  methods: {
    moment,
    remotereset () {
     this.dis = true
      setInterval(() => {
     this.dis = false
    }, 30000)
      console.log(this.radiovalue)
       remoteReset(this.address, this.radiovalue).then(response => {
         console.log(response.result)
         if (response.result === 0) {
         this.resultmsg = '复位成功'
         this.dis = false
         } else {
         this.resultmsg = response.result
         this.dis = false
         }
      })
    },
    onChange (date, dateString) {
        this.radiovalue = date.target.value
    }
  }
}
</script>

<style lang="less">

</style>
