<template>
  <a-card :bordered="false">
    <div class="salesCard">
      <a-tabs
        default-active-key="1"
        size="large"
        :tab-bar-style="{marginBottom: '24px', paddingLeft: '16px'}"
      >
        <a-tab-pane tab="电能" key="1">
          <MeterEnergy />
        </a-tab-pane>
        <a-tab-pane tab="水能" key="2">
          <WaterEnergy />
        </a-tab-pane>
        <a-tab-pane tab="照明" key="4">
          <LightEnergy />
        </a-tab-pane>
        <a-tab-pane tab="空调" key="3">
          <AirConditionEnergy />
        </a-tab-pane>
      </a-tabs>
    </div>
  </a-card>
</template>

<script>
import MeterEnergy from './energy/Meter'
import WaterEnergy from './energy/Water'
import AirConditionEnergy from './energy/AirCondition'
import LightEnergy from './energy/Light'
export default {
  // name: 'Coltroller',
  loading: 'false',
  components: {
    MeterEnergy,
    WaterEnergy,
    AirConditionEnergy,
    LightEnergy
  }
}
</script>
