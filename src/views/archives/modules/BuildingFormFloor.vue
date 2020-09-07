<template>
  <a-modal title="楼层信息" :width="640" :visible="visible" @ok="handleSubmit" @cancel="onCancel">
    <a-form :form="form">
      <a-form-item label="楼层名称" :labelCol="labelCol" :wrapperCol="wrapperCol" hasFeedback>
        <a-input v-decorator="['floorName', {rules:[{required: true, message: '楼层名称'}]}]" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
// import pick from 'lodash.pick'
// import { UpdDigP, InsDigP, GetDiagnosisType, getDiagnosisRuleOptions } from '@/api/archives/DiagnosticPoint'
import { insertFloor, updateFloor } from '@/api/archives/building'
// import { values } from 'mockjs2'

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
      buildingNo: '',
      floor: null,
      visible: false,
      isAdd: null,
      form: this.$form.createForm(this),
      labelCol: { xs: { span: 24 }, sm: { span: 7 } },
      wrapperCol: { xs: { span: 24 }, sm: { span: 13 } }
    }
  },
  mounted () {
  },
  methods: {
    add (buildingNo) {
      this.visible = true
      this.isAdd = true
      this.buildingNo = buildingNo
      console.log('buildingNo', buildingNo)
    },
    update (record) {
      this.visible = true
      this.isAdd = false
      // console.log(record)
      this.floor = record
      setTimeout(() => {
          this.form.setFieldsValue(
        { floorName: record.floorName
          }
        )
      }, 100)
    },
    onCancel () {
      this.visible = false
      this.form.resetFields()
    },
    handleSubmit () {
      if (this.isAdd) {
      this.form.validateFields((err, values) => {
        if (!err) {
          values.buildingNo = this.buildingNo
          console.log('Received values of form: ', values)
          insertFloor(values).then(res => {
            if (res.result) {
              this.$notification['success']({
        message: '通知',
        description:
          '新增成功！',
          duration: 1.5
      })
      this.$emit('refresh')
            }
          })
          this.form.resetFields()
          this.visible = false
        }
      })
      } else {
        this.form.validateFields((err, values) => {
        if (!err) {
          values.floorNo = this.floor.floorNo
          console.log('Received values of form: ', values)
          updateFloor(values).then(res => {
            if (res.result) {
              this.$notification['success']({
        message: '通知',
        description:
          '修改成功！',
          duration: 1.5
      })
      this.$emit('refresh')
            }
          })
          this.form.resetFields()
          this.visible = false
        }
      })
      }
    }
  }
}
</script>
