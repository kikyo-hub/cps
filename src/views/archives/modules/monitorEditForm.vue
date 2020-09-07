<template>
  <a-form @submit="handleSubmit" :form="form">
    <a-form-item
      label="监测点ID"
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
    >
      <a-input v-decorator="['monitorId', {rules:[{required: true, message: '请输入诊断点名称'}]}]" />
    </a-form-item>
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
      label="所属楼层"
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
    >
      <a-input-number style="width: 100%" :min="1" :max="100" v-decorator="['floorNo', {rules:[{required: true, message: '请输入所属楼层'}]}]" />
    </a-form-item>
    <a-form-item
      label="所属房间"
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
    >
      <a-input v-decorator="['roomNo', {rules:[{required: true, message: '请输入所属房间'}]}]" />
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
      <!-- <a-date-picker @change="onChange" style="width: 100%" v-decorator="['createTime', {rules:[{required: true, message: '请选择创建时间'}]}]" /> -->
      <a-date-picker @change="onChange" :default-value="date" :format="dateFormat" style="width: 100%" v-model="date" />
    </a-form-item>
  </a-form>
</template>

<script>
import pick from 'lodash.pick'
import moment from '../../../../node_modules/moment'
import { UpdatemonitorDatas } from '@/api/archives/building'

export default {
  name: 'BuildingForm',
  props: {
    record: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      date: moment(this.record.createTime, 'YYYY-MM-DD'),
      dateFormat: 'YYYY-MM-DD',
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
    console.log('this.', this.record)
    if (this.record) {
      this.form.setFieldsValue(pick(this.record, ['monitorId', 'monitorName', 'deviceType', 'monitorDesc', 'floorNo', 'roomNo', 'equipAddress', 'creator']))
    }
  },
  methods: {
    onChange (date, dateString) {
      this.record.createTime = dateString
    },
    onOk () {
      return new Promise(resolve => {
        resolve(true)
        this.form.validateFields((errors, values) => {
          var par = {}
            par.buildingNo = 1001
            par.monitorId = values.monitorId
            par.monitorName = values.monitorName
            par.deviceType = values.deviceType
            par.monitorDesc = values.monitorDesc
            par.floorNo = values.floorNo
            par.roomNo = values.roomNo
            par.equipAddress = values.equipAddress
            par.creator = values.creator
            par.createTime = this.record.createTime
            // par.values = values
          console.log('更新的：', par)
          UpdatemonitorDatas(par).then(response => {
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
    // handleSubmit (key) {
    //   const newData = [...this.data]
    //   const newCacheData = [...this.cacheData]
    //   const target = newData.filter(item => key === item.key)[0]
    //   const targetCache = newCacheData.filter(item => key === item.key)[0]
    //   if (target && targetCache) {
    //     delete target.editable
    //     this.data = newData
    //     Object.assign(targetCache, target)
    //     this.cacheData = newCacheData
    //   }
    //   this.editingKey = ''
    // }
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
