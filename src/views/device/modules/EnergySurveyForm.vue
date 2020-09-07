<template>
  <a-modal
    title="编辑数据"
    style="top: 100px;"
    :visible="visible"
    @ok="handleSubmit"
    @cancel="onCancel">
    <a-form @submit="handleSubmit" :form="form">
      <a-form-item
        label="设备名称"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input v-decorator="['monotorName', {rules:[{required: true, message: '请输入设备名称'}]}]" />
      <!-- <a-input v-model="record.name" /> -->
      </a-form-item>
      <a-form-item
        label="类型"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input v-decorator="['deviceType', {rules:[{required: true, message: '请输入类型'}]}]" />
      <!-- <a-input v-model="record.number" /> -->
      </a-form-item>
      <a-form-item
        label="位置"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input v-decorator="['floorNO', {rules:[{required: true, message: '请输入位置'}]}]" />
      </a-form-item>
      <a-form-item
        label="设备地址"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input v-decorator="['equipAddress', {rules:[{required: true, message: '请输入设备地址'}]}]" />
      </a-form-item>
      <a-form-item
        label="设备状态"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input v-decorator="['status', {rules:[{required: true, message: '请输入设备状态'}]}]" />
      </a-form-item>
      <a-form-item
        label="运行状态"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input v-decorator="['equipStatus', {rules:[{required: true, message: '请输入运行状态'}]}]" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import pick from 'lodash.pick'

export default {
  name: 'EnterpriseForm',
  props: {
    record: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      visible: false,
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
  methods: {
    add () {
      this.visible = true
    },
    updata (record) {
      console.log('record', record)
      this.visible = true
      setTimeout(() => {
      if (record) {
        this.form.setFieldsValue(pick(record, ['monotorName', 'deviceType', 'floorNO', 'equipAddress', 'equipStatus', 'status']))
      }
      }, 100)
    },
     onCancel () {
      this.visible = false
      this.form.resetFields()
    },
    handleSubmit () {
      const { form: { validateFields } } = this
      // this.visible = false
      validateFields((errors, values) => {
        if (!errors) {
          this.visible = false
          console.log('values', values)
        }
      })
    }
  }
}
</script>
