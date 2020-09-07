<template>
  <a-card :body-style="{padding: '24px 32px'}" :bordered="false">
    <div >
      <u><h3> <a @click="$router.go(-1)">返回</a></h3></u>
    </div>
    <a-form @submit="handleSubmit" :form="form">
      <a-form-item
        label="报告标题"
        help="填写一个报告的标题"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
        <a-input
          v-decorator="[
            'name',
            {rules: [{ required: true, message: '请输入标题' }]}
          ]"
          name="name"
          placeholder="诊断报告的备注标题" />
      </a-form-item>
      <a-form-item
        label="诊断日期"
        help="选择需诊断的时间周期范围"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
        <a-range-picker
          name="buildTime"
          style="width: 100%"
          v-decorator="[
            'buildTime',
            {rules: [{ required: true, message: '请选择诊断的起止日期' }]}
          ]" />
      </a-form-item>
      <a-form-item
        label="自定义诊断规则"
        help="选择'自定义诊断规则'或者'标准诊断规则'"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
        <a-switch v-decorator="['switch', { valuePropName: 'checked' }]" @change="onSwitchChange"/>
      </a-form-item>
      <a-form-item
        label="诊断标准"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
        help="诊断规则标准"
      >
        <a-select
          name="diagonsisRule"
          v-decorator="[
            'diagonsisRule',
            { rules: [{ required: true, message: '请选择诊断标准' }] },
          ]"
        >
          <a-select-option v-for="(item,index) in this.standardTypes" :key="item.no" :value="index">
            {{ item.title }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        label="诊断类型"
        v-if="showEnergy"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
        <a-select
          name="diagonsisType"
          v-decorator="[
            'diagonsisType',
            { rules: [{ required: true, message: '请选择诊断类型' }] },
          ]"
        >
          <a-select-option v-for="(item,index) in diagnosisType" :key="item.no" :value="index">
            {{ item.title }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        label="诊断范围"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
        <a-select
          v-decorator="[
            'diagonsisArea',
            { rules: [{ required: true, message: '请选择诊断范围' }] },
          ]"
          @change="handleChange"
        >
          <a-select-option v-for="(item,index) in areaTypes" :key="index" :value="index">
            {{ item.title }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <!--根据诊断条件显示-->
      <template>
        <component :is="comp" />
      </template>
      <a-form-item
        :wrapperCol="{ span: 24 }"
        style="text-align: center"
      >
        <a-button htmlType="submit" type="primary" :disabled="this.comp ==null">提交</a-button>
        <!-- <a-button style="margin-left: 8px" :disabled="submitDisable()">保存</a-button> -->
      </a-form-item>
    </a-form>
  </a-card>
</template>
<script>

import AllCondition from './Condition/All'
import BuildingCondition from './Condition/Building'
import FloorCondition from './Condition/Floor'
import RoomCondition from './Condition/Room'
import AirSysCondition from './Condition/AirConditionSys'
import LightSys from './Condition/LightSys'
import WaterSys from './Condition/WaterSys'
import CustomArea from './Condition/Custom1'

const Standard = [
  { title: '安徽省公共建筑节能设计标准标准', no: 0 },
  { title: '民用建筑能耗标准', no: 1 }
]
const Custom = [
  { title: '自定义1', no: 100 },
  { title: '自定义2', no: 101 }
]
const diagnosisType = [
  { title: '综合', no: 100, type: 0x1 | 0x2 | 0x4 },
  { title: '水', no: 101, type: 1 },
  { title: '电', no: 102, type: 2 },
  { title: '气', no: 103, type: 3 },
  { title: '热', no: 104, type: 4 }
]

export default {
  name: 'BaseForm',
  components: {
    AllCondition, BuildingCondition, FloorCondition, RoomCondition, CustomArea, AirSysCondition, LightSys, WaterSys
  },
  data () {
    return {
      diagnosisType,
      description: '生成报告请求',
      value: 0,
      area: 1,
      showEnergy: true,
      comp: null,
      checked: false,
      standardTypes: Standard,
      areaTypes: [
        { title: '整个组织', comp: 'AllCondition', type: (0x01 | 0x02 | 0x04) },
        { title: '按楼栋', comp: 'BuildingCondition', type: (0x01 | 0x02 | 0x04) },
        { title: '按楼层', comp: 'FloorCondition', type: (0x01 | 0x02 | 0x04) },
        { title: '按房间', comp: 'RoomCondition', type: (0x01 | 0x02 | 0x04) },
        { title: '自定义', comp: 'CustomArea', type: (0x01 | 0x02 | 0x04) },
        { title: '空调系统', comp: 'AirSysCondition', type: (0x01 | 0x02 | 0x04) },
        { title: '照明系统', comp: 'LightSys', type: (0x01 | 0x02 | 0x04) },
        { title: '给水系统', comp: 'WaterSys', type: (0x01 | 0x02 | 0x04) }
        ],
      // form
      form: this.$form.createForm(this)

    }
  },
  computed: {
  },
  methods: {
     onSwitchChange (checked) {
      if (!checked) {
       this.standardTypes = Standard
     } else {
       this.standardTypes = Custom
      }
      this.showEnergy = !checked
    },
    handleChange (value) {
      this.area = value
      this.comp = this.areaTypes[this.area].comp
    },
    // handler
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
        }
      })
    }
  }
}
</script>
