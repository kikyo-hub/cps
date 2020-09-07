<template>
  <a-form @submit="handleSubmit" :form="form">
    <a-form-item
      label="监测点名称"
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
    >
      <a-input v-decorator="['monitorName', {rules:[{required: true, message: '请输入监测点名称'}]}]" />
      <!-- <a-input v-model="record.name" /> -->
    </a-form-item>
    <a-form-item
      label="用能设备类型"
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
    >
      <a-input v-decorator="['deviceType', {rules:[{required: true, message: '请输入用能设备类型'}]}]" />
      <!-- <a-input v-model="record.number" /> -->
    </a-form-item>
    <a-form-item
      label="描述信息"
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
    >
      <a-input v-decorator="['monitorDesc', {rules:[{required: true, message: '请输入描述信息'}]}]" />
    </a-form-item>
    <a-form-item
      label="所属楼栋"
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
    >
      <a-input v-decorator="['buildingNo', {rules:[{required: true, message: '请输入所属楼层'}], initialValue: '1001'}]" />
    </a-form-item>
    <a-form-item
      label="所属楼层"
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
    >
      <a-input-number style="width: 100%" :min="1" v-decorator="['floorNo', {rules:[{required: true, message: '请输入所属楼层'}]}]" />
    </a-form-item>
    <a-form-item
      label="所属房间"
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
    >
      <a-input-number style="width: 100%" v-decorator="['roomNo', {rules:[{required: true, message: '请输入所属房间'}]}]" />
    </a-form-item>
    <a-form-item
      label="设备地址"
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
    >
      <a-input v-decorator="['equipAddress', {rules:[{required: true, message: '请输入设备地址'}]}]" />
    </a-form-item>
    <a-form-item
      label="创建人员"
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
    >
      <a-input v-decorator="['creator', {rules:[{required: true, message: '请输入创建人员'}]}]" />
    </a-form-item>
    <a-form-item
      label="创建时间"
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
    >
      <a-date-picker @change="onChange" style="width: 100%" v-decorator="['createTime', {rules:[{required: true, message: '请选择创建时间'}]}]" />
    </a-form-item>
  </a-form>
</template>

<script>

import { Addmonitor } from '@/api/archives/building'

export default {
  name: 'MonitorAdd',
  props: {
    record: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      dateString: '',
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
    onChange (date, dateString) {
      this.dateString = dateString
      // console.log(date, dateString)
    },
    onOk () {
      const { form: { validateFields } } = this
          // this.visible = true
      return new Promise(resolve => {
        validateFields((errors, values) => {
          if (!errors) {
            console.log('values', JSON.stringify(values))
            var par = {}
            par.monitorName = values.monitorName
            par.deviceType = values.deviceType
            par.monitorDesc = values.monitorDesc
            par.buildingNo = values.buildingNo
            par.floorNo = values.floorNo
            par.roomNo = values.roomNo
            par.equipAddress = values.equipAddress
            par.creator = values.creator
            par.createTime = this.dateString
            Addmonitor(par).then(res => {
              console.log(123, res)
              if (res.code === 0) {
                this.$message.success('新增成功')
                this.$router.go(0)
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
