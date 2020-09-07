<template>
  <a-form @submit="handleSubmit" :form="form">
    <a-form-item
      label="客户名称"
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
    >
      <a-input v-model="record.name" />
    </a-form-item>
    <a-form-item
      label="客户编号"
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
    >
      <a-input v-model="record.id" />
    </a-form-item>
    <a-form-item
      label="客户电话"
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
    >
      <a-input v-model="record.tel" />
    </a-form-item>
    <a-form-item
      label="客户地址"
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
    >
      <a-input v-model="record.address" />
    </a-form-item>
    <a-form-item
      label="信用等级"
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
    >
      <a-input v-model="record.credit_rate" />
    </a-form-item>
    <a-form-item
      label="行业分类"
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
    >
      <a-input v-model="record.pro_sort" />
    </a-form-item>
    <a-form-item
      label="客户类别"
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
    >
      <a-input v-model="record.category" />
    </a-form-item>
    <a-form-item
      label="建造时间"
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
    >
      <a-date-picker @change="onChange" :default-value="date" :format="dateFormat" style="width: 100%" v-model="date" />
    </a-form-item>
  </a-form>
</template>

<script>
// import pick from 'lodash.pick'
import { UpdateEnDatas } from '@/api/archives/enterprise'
import moment from '../../../../node_modules/moment'

export default {
  name: 'EnterpriseEditForm',
  props: {
    record: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      dateString: this.record.create_date, // 这里设置：若不改变时间，则传v-model绑定的时间，否则报错
      date: moment(this.record.create_date, 'YYYY-MM-DD'),
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
      // this.form.setFieldsValue(pick(this.record, ['buildingname', 'buildingnum', 'GPSlongitude', 'GPSlatitude', 'totalfloors', 'buildingkeeper', 'containcompanies', 'create_date']))
    }
  },
  methods: {
    onChange (date, dateString) {
      this.dateString = dateString
      // console.log(date, dateString)
    },
    onOk () {
      this.record.create_date = this.dateString
      console.log('submit!', this.record.create_date)
      UpdateEnDatas(this.record).then(res => {
        console.log('111', res)
      })
      return new Promise(resolve => {
        resolve(true)
        this.$message.info('保存成功!')
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
