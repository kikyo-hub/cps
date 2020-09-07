<template>
  <div>
    <a-steps :current="current">
      <a-step v-for="item in steps" :key="item.title" :title="item.title" />
    </a-steps>
    <div class="steps-content">
      <component :is="steps[current].page" />
    </div>
    <div class="steps-action">
      <a-button v-if="current < steps.length - 1" type="primary" @click="next">
        下一步
      </a-button>
      <a-button
        v-if="current == steps.length - 1"
        type="primary"
        @click="$message.success('处理完成!')"
      >
        完成
      </a-button>
      <a-button v-if="current > 0" type="dashed" style="margin-left: 8px" @click="prev">
        上一步
      </a-button>
    </div>
  </div>
</template>
<script>

import SurveyPrepare from './Survey/Prepare'
import SurveyObjects from './Survey/Objects'
import SurveyEnergy from './Survey/EnergyType'
import SurveyDefault from './Survey/Default'

export default {
  components: {
    SurveyPrepare, SurveyObjects, SurveyEnergy, SurveyDefault
  },
  data () {
    return {
      current: 0,
      steps: [
        {
          title: '准备',
          page: 'SurveyPrepare'
        },
        {
          title: '选择诊断对象',
          page: 'SurveyObjects'
        },
        {
          title: '选择诊断能效类型',
          page: 'SurveyEnergy'
        },
        {
          title: '选择诊断规则',
          page: 'SurveyDefault'
        },
        {
          title: '结果',
          page: 'SurveyDefault'
        }
      ]
    }
  },
  methods: {
    next () {
      this.current++
    },
    prev () {
      this.current--
    }
  }
}
</script>
<style scoped>
.steps-content {
  margin-top: 10px;
  border: 1px dashed #e9e9e9;
  border-radius: 6px;
  background-color: #fafafa;
  min-height: 200px;
  text-align: center;
  padding-top: 40px;
}

.steps-action {
  margin-top: 24px;
}
</style>
