<template>
  <a-card :bordered="false">
    <div class="salesCard">
      <a-tabs
        default-active-key="1"
        size="large"
        :tab-bar-style="{marginBottom: '24px', paddingLeft: '16px'}"
      >
        <a-tab-pane tab="总电能" key="1">
          <MeterEnergy />
        </a-tab-pane>
        <a-tab-pane tab="空调" key="2">
          <AirConditionEnergy />
        </a-tab-pane>
        <a-tab-pane tab="照明" key="3">
          <LightEnergy />
        </a-tab-pane>
      </a-tabs>
    </div>
  </a-card>
</template>

<script>
import MeterEnergy from './sub/Meter'
import AirConditionEnergy from './sub/AirCondition'
import LightEnergy from './sub/Light'

export default {
  name: 'Coltroller',
  components: {
    MeterEnergy,
    AirConditionEnergy,
    LightEnergy
  },
  data () {
    return {
      visible: false,
      pStyle: {
        fontSize: '16px',
        color: 'rgba(0,0,0,0.85)',
        lineHeight: '24px',
        display: 'block',
        marginBottom: '16px'
      },
      pStyle2: {
        marginBottom: '24px'
      }
    }
  },
  methods: {
    showDrawer () {
      this.visible = true
    },
    onClose () {
      this.visible = false
    }
  }
}
</script>
