<template>
  <a-form :form="inline">
    <!-- <a-form-item
      label="诊断点编号"
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
      style="display:none;"
    >
      <a-input v-decorator="['diagnosisId', {rules:[{required: false, message: '诊断点编号'}]}]" />
    </a-form-item>
    <a-form-item label="诊断点名称" :labelCol="labelCol" :wrapperCol="wrapperCol" hasFeedback>
      <a-input v-decorator="['diagnosisName', {rules:[{required: true, message: '诊断点名称'}]}]" />
    </a-form-item>
    <a-form-item label="诊断规则" :labelCol="labelCol" :wrapperCol="wrapperCol" hasFeedback>
      <a-select
        mode="multiple"
        placeholder="请选择 诊断规则"
        v-decorator="['diagnosisRuleList', {rules:[{required: true, message: '诊断规则'}]}]"
      >
        <a-select-option v-for="item in diagnosisRuleOptions" :key="item.key" :value="item.value">
          {{ item.display }}
        </a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="诊断点类型" :labelCol="labelCol" :wrapperCol="wrapperCol" hasFeedback>
      <a-select
        placeholder="请选择 诊断点类型"
        v-decorator="['diagnosisType', {rules:[{required: true, message: '需选择 诊断点类型'}]}]"
      >
        <a-select-option v-for="item in diagnosisTypeOptions" :key="item.key" :value="item.value">
          {{ item.display }}
        </a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="楼栋号" :labelCol="labelCol" :wrapperCol="wrapperCol" hasFeedback>
      <a-select
        placeholder="请选择 楼栋号"
        v-decorator="['buildingNo', {rules:[{required: true, message: '需选择 楼栋号'}]}]"
      >
        <a-select-option v-for="item in BuildingOptions" :key="item.key" :value="item.value">
          {{ item.display }}
        </a-select-option>
      </a-select>
    </a-form-item> -->
  </a-form>
</template>

<script>
import pick from 'lodash.pick'
import { UpdDigP, InsDigP, GetDiagnosisType, getDiagnosisRuleOptions } from '@/api/archives/DiagnosticPoint'
import { GetBuildingOption } from '@/api/archives/MonitorPoint'

export default {
  props: {
    record: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      parameter: {},
      diagnosisTypeOptions: [
        { key: '', val: '', display: '' }
      ],
      BuildingOptions: [
        { key: '', val: '', display: '' }
      ],
      diagnosisRuleOptions: [{ key: '', val: '', display: '' }],
      visible: false,
      form: this.$form.createForm(this),
      labelCol: { lg: { span: 7 }, sm: { span: 7 } },
      wrapperCol: { lg: { span: 10 }, sm: { span: 17 } }
    }
  },
  mounted () {
    this.getOptions()
    // if (this.record) {
    //   this.form.setFieldsValue(pick(this.record, ['diagnosisId', 'diagnosisName', 'diagnosisRuleId', 'diagnosisType', 'buildingNo']))
    // }
  },
  methods: {
    getOptions () {
      GetDiagnosisType().then(res => {
        this.diagnosisTypeOptions = res.result.selectable
      })
      GetBuildingOption().then(res => {
        this.BuildingOptions = res.result
      })
      getDiagnosisRuleOptions().then(res => {
        this.diagnosisRuleOptions = res.result
      })
    },
    add () {
      this.visible = true
    },
    update (record) {
      this.visible = true
      setTimeout(() => {
        if (record) {
          this.form.setFieldsValue(pick(record, ['diagnosisId', 'diagnosisName', 'diagnosisType', 'buildingNo']))
          // diagnosisRuleList
          var diagnosisRuleList = []
          for (let i = 0; i < record.diagnosisRuleList.length; i++) {
            diagnosisRuleList[i] = record.diagnosisRuleList[i].value
          }
          this.form.setFieldsValue({ diagnosisRuleList: diagnosisRuleList })
        }
      }, 100)
    },
    onCancel () {
      this.visible = false
      this.form.resetFields()
    },
    handleSubmit () {
      const {
        form: { validateFields }
      } = this
      validateFields((errors, values) => {
        if (!errors) {
          if (!values.diagnosisId) {
            InsDigP(values).then(res => {
              if (res.code === 0) {
                this.$message.success('新增成功')
                this.$emit('ok', true)
                this.visible = false
                this.form.resetFields()
              } else {
                this.$message.warning('新增失败')
              }
            })
          } else {
            UpdDigP(values).then(response => {
              if (response.code === 0) {
                this.$message.success('更新成功')
                this.$emit('ok', true)
                this.visible = false
                this.form.resetFields()
              } else {
                this.$message.warning('数据处理失败')
              }
            })
          }
        }
      })
    }
  }
}
</script>
