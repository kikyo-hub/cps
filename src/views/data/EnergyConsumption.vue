<template>
  <a-card :bordered="false">
    <div class="salesCard">
      <a-tabs
        default-active-key="1"
        size="large"
        :tab-bar-style="{marginBottom: '24px', paddingLeft: '16px'}"
      >
        <a-tab-pane tab="电能" key="1" >
          <electricdata/>
        </a-tab-pane>
        <a-tab-pane tab="水能" key="2" forceRender>
          <waterdata/>
        </a-tab-pane>
        <a-tab-pane tab="温湿度" key="3" forceRender>
          <humiditydata/>
        </a-tab-pane>
      </a-tabs>
    </div>
  </a-card>
</template>

<script>
import electricdata from './modules/electricdata'
import waterdata from './modules/waterdata'
import humiditydata from './modules/humiditydata'
export default {
  // name: 'electric',
  loading: 'false',
  components: {
       electricdata,
       waterdata,
       humiditydata
  }

}
</script>
