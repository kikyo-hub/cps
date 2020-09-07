<template>
  <a-form @submit="handleSubmit" :form="form">
    <a-form-item
      label="楼层"
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
    >
      <a-input v-decorator="['devicename', {rules:[{required: true, message: '请输入设备名称'}]}]" />
      <!-- <a-input v-model="record.name" /> -->
    </a-form-item>
    <a-form-item
      label="类型"
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
    >
      <a-input v-decorator="['type', {rules:[{required: true, message: '请输入类型'}]}]" />
      <!-- <a-input v-model="record.number" /> -->
    </a-form-item>
    <a-form-item
      label="位置"
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
    >
      <a-input v-decorator="['address', {rules:[{required: true, message: '请输入位置'}]}]" />
    </a-form-item>
    <a-form-item
      label="运行状态"
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
    >
      <a-input v-decorator="['status', {rules:[{required: true, message: '请输入运行状态'}]}]" />
    </a-form-item>
    <a-form-item
      label="设备状态"
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
    >
      <a-input v-decorator="['running', {rules:[{required: true, message: '请输入设备状态'}]}]" />
    </a-form-item>
  </a-form>
</template>

<script>

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
    onOk () {
    //     this.form.resetFields()
    //     this.record = Object.assign({}, this.record)
    //     this.$nextTick(() => {
    //      // 设置初始值
    //     this.form.setFieldsValue(pick(this.record, ['id', 'devicename', 'type', 'address', 'status', 'running']))
    // })
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
        }
      })
    // this.$nextTick(() => {
    //  this.form.resetFields()
    //  this.form.setFieldsValue({ 'devicename': '吴桂鑫' })
    //  })
    this.$message.info('保存成功')
      return new Promise(resolve => {
        resolve(true)
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
          console.log('values', values)
        }
      })
    }
  }
}
</script>
