<template>
  <a-modal title="房间信息" :width="640" :visible="visible" @ok="handleSubmit" @cancel="onCancel">
    <a-form :form="form">
      <a-form-item label="房间名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-input v-decorator="['roomName', {rules:[{required: true, message: '需输入房间名称'}]}]" />
      </a-form-item>
      <a-form-item label="房间类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-input v-decorator="['category', {rules:[{required: true, message: '需输入房间类型'}]}]" />
      </a-form-item>
      <a-form-item label="房间面积" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-input-number
          :precision="2"
          :min="1"
          :max="100000"
          v-decorator="[ 'area',{rules: [{ required: true, message: '需输入房间面积！' }]} ]"
          style="width:100%" />
      </a-form-item>
      <a-form-item label="员工人数" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-input-number
          :precision="0"
          :min="1"
          :max="100000"
          v-decorator="[ 'employees',{rules: [{ required: true, message: '需输入员工人数！' }]} ]"
          style="width:100%" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import pick from 'lodash.pick'
import { insertRoom, updateRoom } from '@/api/archives/building'

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
      visible: false,
      floorNo: '',
      roomNo: '',
      form: this.$form.createForm(this),
      labelCol: { xs: { span: 24 }, sm: { span: 7 } },
      wrapperCol: { xs: { span: 24 }, sm: { span: 13 } }
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
    },
    add (floorNo) {
      this.visible = true
      this.isAdd = true
      this.floorNo = floorNo
    },
    update (record) {
      this.visible = true
      this.isAdd = false
      this.roomNo = record.roomNo
      setTimeout(() => {
        if (record) {
          this.form.setFieldsValue(pick(record, ['roomName', 'category', 'area', 'employees']))
        }
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
          values.floorNo = this.floorNo
          console.log('Received values of form: ', values)
          insertRoom(values).then(res => {
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
          values.roomNo = this.roomNo
          console.log('Received values of form: ', values)
          updateRoom(values).then(res => {
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
