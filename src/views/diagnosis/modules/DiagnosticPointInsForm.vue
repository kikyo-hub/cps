<template>
  <a-form :form="form">
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
import { InsDigP } from '@/api/archives/DiagnosticPoint'
// import { insEquip, GetEquipTypeO, GetEquipCommModeO, GetEquipProtocolO, GetEquipModeOptions } from '@/api/archives/MonitorEquip'

export default {
  name: 'DiagnosticPointInsForm',
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
      form: this.$form.createForm(this),
      equipTypeOptions: [
        { key: '', val: '', display: '' }
      ],
      equipCommModeOptions: [
        { key: '', val: '', display: '' }
      ],
      equipProtocolOptions: [
        { key: '', val: '', display: '' }
      ],
      equipModeOptions: [
        { key: '', val: '', display: '' }
      ]
    }
  },
  mounted () {
    // this.getOptions()
  },
  methods: {
    // getOptions () {
    //   GetEquipTypeO().then(response => {
    //     this.equipTypeOptions = response.result.selectable
    //     // console.log(JSON.stringify(this.equipTypeOptions))
    //   })
    //   GetEquipCommModeO().then(response => {
    //     this.equipCommModeOptions = response.result.selectable
    //     // console.log(JSON.stringify(this.equipCommModeOptions))
    //   })
    //   GetEquipProtocolO().then(response => {
    //     this.equipProtocolOptions = response.result.selectable
    //     // console.log(JSON.stringify(this.equipProtocolOptions))
    //   })
    //   GetEquipModeOptions().then(response => {
    //     this.equipModeOptions = response.result.selectable
    //     // console.log(JSON.stringify(this.equipModeOptions))
    //   })
    // },
    onOk () {
      const { form: { validateFields } } = this
          // this.visible = true
      return new Promise(resolve => {
        validateFields((errors, values) => {
          if (!errors) {
            console.log('values', JSON.stringify(values))
            InsDigP(values).then(res => {
              if (res.code === 0) {
                this.$message.success('新增成功')
                  // this.visible = false
                  resolve(true)
              } else {
                this.$message.warning('新增失败')
              }
            })
          }
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
      // this.visible = true
      return validateFields((errors, values) => {
        if (!errors) {
           console.log('values', JSON.stringify(values))
            // insEquip(values).then(res => {
            //   if (res.code === 0) {
            //     this.$message.success('新增成功')
            //       // this.visible = false
            //       return true
            //   } else {
            //     this.$message.warning('新增失败')
            //   }
            // })
        }
         return false
      })
    }
  }
}
</script>
