<template>
  <div>
    <a-card title="用能统计与分析">
      <a-row :gutter="8">
        <a-col :span="4">
          <Stree @test="test"></Stree>
        </a-col>
        <a-col :span="20">
          <ComprehensiveEnergy ref="comprehensiveEnergy"></ComprehensiveEnergy>
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>
<script>
import Stree from './consumption/components/STreeMonitor'
import ComprehensiveEnergy from './EnergyAnalysis/ComprehensiveEnergy'

export default {
    components: {
    Stree,
    ComprehensiveEnergy
  },
    data () {
        return {
          a: 1
        }
    },
    created () {
    },
    mounted () {
    },
    methods: {
        test (e) {
            console.log('监听子组件事件', e)
            // 子组件数据
            console.log(this.$refs.comprehensiveEnergy.dateFormat)
            this.$refs.comprehensiveEnergy.testt(e)
        }
    }
}
</script>
