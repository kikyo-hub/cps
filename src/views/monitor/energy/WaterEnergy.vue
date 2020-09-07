<template>
  <a-card :bordered="false">
    <div class="salesCard">
      <a-tabs
        default-active-key="1"
        size="large"
        :tab-bar-style="{marginBottom: '24px', paddingLeft: '16px'}"
      >
        <a-tab-pane tab="总水能" key="1">
          <WaterEnergy />
        </a-tab-pane>
        <a-tab-pane tab="电热水器" key="2">
          <WaterHeater />
        </a-tab-pane>
        <a-tab-pane tab="空调用水" key="3">
          <ACWater />
        </a-tab-pane>
      </a-tabs>
    </div>
  </a-card>
</template>

<script>
import WaterEnergy from './sub/Water'
import WaterHeater from './sub/WaterHeater'
import ACWater from './sub/ACWater'
export default {
  name: 'Coltroller',
  components: {
    WaterEnergy,
    WaterHeater,
    ACWater
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
