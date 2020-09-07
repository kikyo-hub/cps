<template>
  <div>
    <a-input-group compact style="display：online-block">
      <a-button type="primary" style="margin-left:1%;" @click="CallClicktime" :disabled="dis" icon="ci">
        召测
      </a-button>
      <a-button type="primary" style="margin-left:1%;" @click="setTime" :disabled="dis" icon="setting">
        设置
      </a-button>
      <div style="margin-top:0.6%;margin-left:1%">允许超时时间</div>
      <a-select default-value="30" v-model="selectvalue" style="width: 20%;margin-left:1%" @change="handleChange">
        <a-select-option value="30">30</a-select-option>
        <a-select-option value="60">60</a-select-option>
      </a-select>
    </a-input-group>
    <div style="margin-top:8px;">
      <a-textarea
        placeholder="召测结果/设置结果"
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
import { getCallTime, setCallTime } from '@/api/archives/MonitorEquip'
export default {
    components: {
    getCallTime,
    setCallTime
    },
  // eslint-disable-next-line vue/require-prop-types
  props: ['address'],
  data () {
    return {
        visible: false,
        resultmsg: '',
        selectvalue: 30,
        dis: false
    }
  },
  created () {
  },
  mounted () {
  },
  methods: {
    moment,
    getCurrentData () {
    console.log(new Date().toLocaleDateString())
      return new Date().toLocaleDateString()
    },
    CallClicktime () {
      this.dis = true
      setInterval(() => {
        this.dis = false
      }, 30000)
       getCallTime(this.address, this.selectvalue).then(res => {
        this.resultmsg = res
        this.dis = false
      })
      console.log('6666666')
    },
    handleChange (value, resolve) {
      this.selectvalue = value
     console.log(value)
    },
    setTime () {
       this.dis = true
      setInterval(() => {
        this.dis = false
      }, 30000)
      this.resultmsg = ''
       setCallTime(this.address).then(res => {
         console.log(res)
         if (res === 0) {
         this.resultmsg = '设置成功'
         this.dis = false
         } else {
         this.resultmsg = '设置失败'
         this.dis = false
         }
        console.log(this.resultmsg)
      })
    },
    onChange (date, dateString) {
      console.log(date, dateString)
    },
    showModal () {
      this.visible = true
    },
    handleOk (e) {
      console.log(e)
      this.visible = false
    }
  }
}
</script>

<style lang="less">

</style>
