<template>
  <div id="pdfCentent" style="margin-top:50px;">
    <p class="spaceeee"></p>
    <template v-if="enterprisedata">
      <p align="center" style="margin-top:50px;font-size:30px;font-weight:bolder">{{ enterprisedata.name }}</p>
    </template>
    <p align="center" style="font-size:30px;font-weight:bolder">能效诊断报告</p>
    <p class="space0"></p>
    <p align="left" style="margin-left:500px;font-size:25px;font-weight:bolder">诊 断 日 期：{{ enterprisedata.create_date }}</p>
  </div>
</template>

<script>
import { GetEnterpriseData } from '@/api/archives/enterprise'

export default {
    name: 'ReportHead',
    data () {
      return {
        enterprisedata: ''
      }
    },
    created () {
      this.getData()
    },
  mounted () {
  },
  methods: {
  getData () {
    GetEnterpriseData(1).then(response => {
      this.enterprisedata = response.result
      console.log('this.enterprisedata: ', this.enterprisedata)
    })
  }
  }
  }
</script>

<style lang="less" scoped>
.space0{
  margin-bottom:400px;
}
.space{
  margin-bottom:900px;
}
</style>
