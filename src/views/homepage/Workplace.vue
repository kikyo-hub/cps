<template>
  <div class="box">
    <a-card :bordered="true" title="能源流向图">
      <!-- <img src="/workplace.gif" /> -->
      <span slot="extra">
        <a-form layout="inline">
          <a-form-item label="选择日期">
            <a-date-picker style="width: 80%" placeholder="请选择日期" :default-value="date" format="YYYY/MM/DD"/>
          </a-form-item>
          <!-- <a-form-item><a-button type="primary" @click="query => chart()">查询</a-button></a-form-item> -->
          <a-form-item><a-button type="primary" @click=" () => chart()">查询</a-button></a-form-item>
        </a-form>
      </span>
      <a-tabs default-active-key="1">
        <a-tab-pane key="1">
          <span slot="tab">
            <a-icon type="reconciliation" />
            建筑流向
          </span>
          <sankey1></sankey1>
        </a-tab-pane>
        <a-tab-pane key="2">
          <span slot="tab">
            <a-icon type="sliders" />
            系统流向
          </span>
          <sankey2></sankey2>
        </a-tab-pane>
      </a-tabs>
    </a-card>
  </div>
</template>

<script>
import Sankey1 from './Sankey1'
import Sankey2 from './Sankey2'
import moment from 'moment'
export default {
    components: {
        Sankey1,
        Sankey2
    },
  data () {
    return {
        date: null
    }
    },
    created () {
        this.getTime()
        },
    mounted () {
    },
    methods: {
        getTime () {
        // new Date() new一个data对象，当前日期和时间
        // toLocaleString() 方法可根据本地时间把 Date 对象转换为字符串，并返回结果。
        let nowtime = ''
         nowtime = new Date().toLocaleString()
       this.date = moment(nowtime, 'YYYY/MM/DD')
      },
      chart () {}
    }
}
</script>

<style>

.box{
  width:100%;
  height:100%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

.box img {
    max-width: 100%;
    max-height: 100%;
  }

</style>
