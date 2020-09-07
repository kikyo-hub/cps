<template>
  <a-form :form="form">
    <a-form-item
      label="诊断点编号"
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
      style="display:none;"
    >
      <a-input v-decorator="['diagnosisId', {rules:[{required: true, message: '诊断点编号'}]}]" />
    </a-form-item>
    <a-form-item
      label="诊断点名称"
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
    >
      <a-input v-decorator="['diagnosisName', {rules:[{required: true, message: '诊断点名称'}]}]" />
    </a-form-item>
    <a-form-item
      label="诊断规则"
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
    >
      <a-input v-decorator="['diagnosisRuleId', {rules:[{required: true, message: '诊断规则'}]}]" />
    </a-form-item>
    <a-form-item
      label="诊断点类型"
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
    >
      <a-input v-decorator="['diagnosisType', {rules:[{required: true, message: '诊断点类型'}]}]" />
    </a-form-item>
    <a-form-item
      label="楼栋号"
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
    >
      <a-input v-decorator="['buildingNo', {rules:[{required: true, message: '楼栋号'}]}]" />
    </a-form-item>
  </a-form>
</template>

<script>
import pick from 'lodash.pick'
import { UpdDigP } from '@/api/archives/DiagnosticPoint'
// import { insEquip, GetEquipTypeO, GetEquipCommModeO, GetEquipProtocolO, GetEquipModeOptions } from '@/api/archives/MonitorEquip'

export default {
  name: 'DiagnosticPointUpdForm',
  props: {
    record: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      parameter: {},
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 13 }
      },
      form: this.$form.createForm(this)
    }
  },
  mounted () {
    // this.getOptions()
    if (this.record) {
      this.form.setFieldsValue(pick(this.record, ['diagnosisId', 'diagnosisName', 'diagnosisRuleId', 'diagnosisType', 'buildingNo']))
    }
  },
  methods: {
    // getOptions () {
    // },
    onOk () {
      return new Promise(resolve => {
        resolve(true)
        this.form.validateFields((errors, values) => {
          // console.log(JSON.stringify(values, null, 4))
          this.parameter = values
          // console.log('par:', this.par)
          console.log('更新的：', values)
          // var ttttttt = { 'equipId': '10000029', 'equipType': '66', 'commMode': '66', 'protocolType': '66', 'equipMode': '66', 'equipName': '66', 'commAddress': '66', 'assetNo': '66' }
          UpdDigP(values).then(response => {
            if (response.code === 1) {
              this.$message.success('更新成功')
            } else if (response.code === 100) {
              this.$message.warning('数据处理失败')
            }
          })
        })
      })
    },
    onCancel () {
      return new Promise(resolve => {
        resolve(true)
      })
    },
    handleSubmit () {
      const { form: { validateFields } } = this
      this.visible = true
      validateFields((errors, values) => {
        if (!errors) {
          // console.log(JSON.stringify(values, null, 4))
        }
      })
    }
  }
}
</script>
