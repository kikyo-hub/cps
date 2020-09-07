<template>
  <div>
    <a-input-group compact style="display：online-block">
      <div style="margin-top:0.6%">设备名称</div>
      <a-select
        mode="multiple"
        style="width: 80%;margin-left:1%"
        placeholder="请选择"
        @change="onChange"
      >
        <a-select-option v-for="d in templateDatas" :key="d.commAddress" :value="d.equipName">
          {{ d.equipName }}
        </a-select-option>
      </a-select>
      <a-button type="primary" style="margin-left:1%;">
        下发
      </a-button>
      <a-modal v-model="visible" title="下发结果" @ok="handleOk">
        <a-textarea
          placeholder="下发结果"
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
import { getAllLowerEquipment } from '@/api/archives/equip'

export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['address'],
  data () {
    return {
        templateDatas: [],
        visible: false,
        value: '',
        comadress: this.address,
        dateFormat: 'YYYY/MM/DD'
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
    getCurrentData () {
        console.log(new Date().toLocaleDateString())
      return new Date().toLocaleDateString()
    },
    onChange (date, dateString) {
      console.log(date, dateString)
    },
    // showModal () {
    //   this.visible = true
    // },
    handleOk (e) {
      console.log(e)
      this.visible = false
    }
  }
}
</script>

<style lang="less">

</style>
