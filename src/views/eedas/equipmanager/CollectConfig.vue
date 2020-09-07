<template>
  <div>
    <a-input-group compact style="display：online-block">
      <a-select
        mode="multiple"
        style="width: 80%;margin-left:1%"
        placeholder="请选择"
        @change="onChange"
      >
        <a-select-option v-for="d in templateDatas" :key="d.COLLECTION_RULE_ID" :value="d.RULE_NAME">
          {{ d.RULE_NAME }}
        </a-select-option>
      </a-select>
      <a-button type="primary" style="margin-left:1%;" @click="Issue">
        下发
      </a-button>
    </a-input-group>
    <div style="margin-top:8px;margin-left:1%">
      <a-textarea
        placeholder="下发结果"
        :autoSize="{ minRows: 24, maxRows: 24 }"
        v-model="value"
        :disabled="true"
        style="margin-top:0%;overflowY:scroll;">
      </a-textarea>
    </div>
  </div>
</template>
<script>
import { GetCollRule } from '@/api/archives/MonitorPoint'
import moment from 'moment'
export default {
   // eslint-disable-next-line vue/require-prop-types
   props: ['address'],
  data () {
    return {
        visible: false,
        templateDatas: [],
        comadress: this.address,
        value: ''
    }
  },
  created () {
    GetCollRule().then(response => {
          console.log(response)
          this.templateDatas = response.result
        })
  },
  mounted () {

  },
  methods: {
    moment,
    Issue () {

    },
    CallClick () {
      // console.log('6666666')
    },
    onChange (date, dateString) {
      console.log(date, dateString)
    },
    handleOk (e) {
      console.log(e)
      this.visible = false
    }
  }
}
</script>

<style lang="less">

</style>
