<template>
  <a-form @submit="handleSubmit" :form="form">
    <a-form-item
      label="楼栋名称"
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
    >
      <a-input v-model="record[0].BUILDING_NAME" />
    </a-form-item>
    <a-form-item
      label="楼栋编号"
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
    >
      <!-- <a-input v-decorator="['buildingnum', {rules:[{required: true, message: '请输入楼栋编号'}]}]" /> -->
      <a-input v-model="record[0].BUILDING_NO" />
    </a-form-item>
    <a-form-item
      label="楼栋位置"
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
    >
      <a-input v-model="record[0].BUILDING_ADDRESS" />
    </a-form-item>
    <a-form-item
      label="楼栋总面积"
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
    >
      <a-input v-model="record[0].BUILDING_AREA" />
    </a-form-item>
    <a-form-item
      label="GPS经度"
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
    >
      <a-input v-model="record[0].LONGITUDE" />
    </a-form-item>
    <a-form-item
      label="GPS纬度"
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
    >
      <a-input v-model="record[0].LATITUDE" />
    </a-form-item>
    <a-form-item
      label="楼栋总层数"
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
    >
      <a-input-number style="width: 100%" :min="1" :max="99" v-model="record[0].FLOOR_CNT" />
    </a-form-item>
    <a-form-item
      label="楼栋管家"
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
    >
      <a-input v-model="record[0].BUILDING_STEWARD" />
    </a-form-item>
    <a-form-item
      label="包含公司数"
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
    >
      <a-input-number style="width: 100%" :min="1" :max="99" v-model="record[0].COMPANY_NUMB" />
    </a-form-item>
    <a-form-item
      label="建造时间"
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
    >
      <!-- <a-date-picker style="width: 100%" v-decorator="['createtime', {rules:[{required: true, message: '请选择建造时间'}]}]" /> -->
      <a-date-picker @change="onChange" :default-value="date" :format="dateFormat" style="width: 100%" v-model="date" />
    </a-form-item>
  </a-form>
</template>

<script>
import pick from 'lodash.pick'
import { UpdateDatas } from '@/api/archives/enterprise'
import moment from '../../../../node_modules/moment'

export default {
  name: 'BuildingEditForm',
  // inject: ['reload'],
  props: {
    record: {
      type: Array,
      default: null
    }
  },
  data () {
    return {
      dateString: this.record[0].CREATE_TIME, // 这里设置：若不改变时间，则传v-model绑定的时间，否则报错
      date: moment(this.record[0].CREATE_TIME, 'YYYY-MM-DD'),
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
      this.form.setFieldsValue(pick(this.record, ['buildingname', 'buildingnum', 'GPSlongitude', 'GPSlatitude', 'totalfloors', 'buildingkeeper', 'containcompanies', 'CREATE_TIME']))
    }
  },
  methods: {
    onChange (date, dateString) {
      this.dateString = dateString
      // console.log(date, dateString)
    },
    onOk () {
      this.record[0].CREATE_TIME = this.dateString
      UpdateDatas(this.record[0]).then(res => {
        console.log('111', res)
      })
      return new Promise(resolve => {
        resolve(true)
        this.$message.info('保存成功!')
        // this.reload()
      })
      //   this.form.validateFields((err, values) => {
      //   if (!err) {
      //     console.log('接受表单信息：', values)
      //   }
      //   setTimeout(() => {
      //   this.confirmLoading = false
      // }, 2000)
      // })
      // this.$message.info('保存成功!')
      // return new Promise(resolve => {
      //   resolve(true)
      // })
    //   return new Promise(resolve => {
    //     resolve(true)
    //   })
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
