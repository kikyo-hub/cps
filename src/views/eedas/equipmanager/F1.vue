<template>
  <div >
    <a-button type="primary" @click="CallClickF1()" style="margin-top:-2%;height:30px" :disabled="disa" icon="ci">
      召测
    </a-button>
    <a-card title="版本信息">
      <a-card-grid style="width:25%;text-align:center;">
        厂商代码
      </a-card-grid>
      <a-card-grid style="width:25%;text-align:center">
        {{ Manufacturercode }}
      </a-card-grid>
      <a-card-grid style="width:25%;text-align:center" >
        软件版本号
      </a-card-grid>
      <a-card-grid style="width:25%;text-align:center">
        {{ version }}
      </a-card-grid><br>
      <a-card-grid style="width:25%;text-align:center">
        软件版本日期
      </a-card-grid>
      <a-card-grid style="width:25%;text-align:center">
        {{ weekversiontime }}
      </a-card-grid>
      <a-card-grid style="width:25%;text-align:center">
        硬件版本号
      </a-card-grid>
      <a-card-grid style="width:25%;text-align:center">
        {{ hardversion }}
      </a-card-grid><br>
      <a-card-grid style="width:25%;text-align:center">
        硬件版本日期
      </a-card-grid>
      <a-card-grid style="width:25%;text-align:center">
        {{ hardversiontime }}
      </a-card-grid>
      <a-card-grid style="width:25%;text-align:center">
        厂家扩展信息
      </a-card-grid>
      <a-card-grid style="width:25%;text-align:center">
        {{ Manufacturermsg }}
      </a-card-grid>
    </a-card>
  </div>
</template>
<script>
import { Descriptions } from 'ant-design-vue'
import { getCallVersion } from '@/api/archives/MonitorEquip'
export default {
  components: {
  getCallVersion,
  Descriptions
  },
  // eslint-disable-next-line vue/require-prop-types
  props: ['address'],
  data () {
    return {
      Manufacturercode: '-',
      version: '-',
      weekversiontime: '-',
      hardversion: '-',
      hardversiontime: '-',
      Manufacturermsg: '-',
      resultmsg: [],
      disa: false
    }
  },
  created () {
  },
  mounted () { // 在模板编译完成后执行
	},
  methods: {
    CallClickF1 (index) {
    this.disa = true
    setInterval(() => {
      this.disa = false
    }, 30000)
      getCallVersion(this.address).then(res => {
       var resultmsg = res.substring(1, res.length - 1)
        console.log(resultmsg)
       if (res.length === 14) {
          this.Manufacturercode = '召测数据失败，可能终端不在线'
           this.version = '召测数据失败，可能终端不在线'
           this.weekversiontime = '召测数据失败，可能终端不在线'
           this.hardversion = '召测数据失败，可能终端不在线'
           this.hardversiontime = '召测数据失败，可能终端不在线'
           this.Manufacturermsg = '召测数据失败，可能终端不在线'
       this.disa = false
        } else {
       var splitdata = resultmsg.split(',')
        console.log(splitdata[0])
           this.Manufacturercode = splitdata[0]
           this.version = splitdata[1]
           this.weekversiontime = splitdata[2]
           this.hardversion = splitdata[3]
           this.hardversiontime = splitdata[4]
           this.Manufacturermsg = splitdata[5]
        this.disa = false
        }
      })
    }
  }
}
</script>

<style lang="less">
.myTable {
  border-collapse: collapse;
  margin: 0 auto;
  text-align: center;
}
.myTable td,
.myTable th {
  border: 1px solid #cad9ea;
  color: #666;
  height: 60px;
  width:50%
}
</style>
