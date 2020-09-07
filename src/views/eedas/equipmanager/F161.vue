<template>
  <div>
    <a-input-group compact style="display：online-block">
      <div style="margin-top:0.6%">选择查询条件</div>
      <a-select
        mode="multiple"
        style="width: 35%;margin-left:1%"
        placeholder="请选择"
        @change="onChange"
      >
        <a-select-option v-for="d in templateDatas" :key="d.commAddress" :value="d.equipName">
          {{ d.equipName }}
        </a-select-option>
      </a-select>
      <a-range-picker @change="onChangeTime" style="margin-left:1%;" :default-value="[moment(getCurrentData(), dateFormat), moment(getNextData(), dateFormat)]" :format="dateFormat"/>
      <a-button type="primary" style="margin-left:1%;" @click="showModal" icon="ci">
        召测
      </a-button>
      <a-modal v-model="visible" title="召测结果" @ok="handleOk">
        <a-textarea
          placeholder="召测结果/设置结果"
          :autoSize="{ minRows: 23, maxRows: 23 }"
          v-model="value"
          :disabled="true"
          style="margin-top:1%;overflowY:scroll;">
        </a-textarea>
      </a-modal>
    </a-input-group>
    <div style="margin-top:8px;">
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
import moment from 'moment'
import { getAllLowerEquipment } from '@/api/archives/equip'
export default {
    // eslint-disable-next-line vue/require-prop-types
  props: ['address'],
  data () {
    return {
        templateDatas: [],
        visible: false,
        value: '',
        dateFormat: 'YYYY/MM/DD',
        comadress: this.address
    }
  },
  created () {
    console.log(this.comadress)
    getAllLowerEquipment(this.comadress).then(response => {
          console.log(response)
          this.templateDatas = response.result
        })
  },
  mounted () {

  },
  methods: {
    moment,
    getCurrentData () {
      return new Date().toLocaleDateString()
    },
    getNextData () {
      return new Date(new Date().setDate(new Date().getDate() + 1)).toLocaleDateString()
    },
    onChange (date, dateString) {
      console.log(date, dateString)
    },
    onChangeTime (date, dateString) {
      console.log(date, dateString)
    },
    showModal () {
      this.visible = true
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
