<template>

  <a-card >
    <a-tabs default-active-key="kW·h" :tab-bar-style="{marginBottom: '0px', paddingLeft: '16px'}">
      <a-tab-pane v-for="item in energyTypes" :key="item.unit" :tab="item.name">
        <EnergyView :energyType="item"></EnergyView>
        <EnergyRealtime :energyType="item"></EnergyRealtime>
      </a-tab-pane>
    </a-tabs>
  </a-card>

</template>

<script>
import EnergyView from './module/EnergyView'
import EnergyRealtime from './module/EnergyRealtime'

const energyTypes = [
  {
  key: '1',
  name: '电能耗',
  unit: 'kW·h',
  icon: 'bars',
  chart: ['空调', '照明', '动力系统', '其他']
  },
  {
    key: '2',
    name: '水能耗',
    unit: 't',
    icon: 'appstore',
    chart: ['热水器', '中央空调', '清洁', '其他']
  },
  {
    key: '3',
    name: '气能耗',
    unit: 'm³',
    icon: 'appstore',
    chart: ['产线', '食堂', '走廊', '其他']
  },
  {
    key: '4',
    name: '热能耗',
    unit: 'KJ',
    icon: 'appstore',
    chart: ['办公区域', '大厅', '车间', '其他']
  }
 ]

export default {
  name: 'EnergyConsumption',
  components: {
    EnergyView,
    EnergyRealtime
  },
  data () {
    return {
      loading: false,
      energyTypes
    }
  },
  mounted () {
  },
  methods: {

  }
}
</script>
<style scoped>

</style>
