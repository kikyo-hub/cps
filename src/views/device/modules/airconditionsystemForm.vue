<template>
  <a-modal
    title="编辑数据"
    style="top: 100px;"
    :visible="visible"
    @ok="handleSubmit"
    @cancel="onCancel"
  >
    <a-form @submit="handleSubmit" :form="form">
      <a-form-item
        label="楼栋名称"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-select
          placeholder="请选择"
          v-decorator="['buildingName', {rules:[{required: true, message: '请输入楼栋名称'}]}]"
          @change="buliding">
          <a-select-option v-for="item in BuildingOptions" :key="item.value">
            {{ item.label }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        label="设备名称"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input v-decorator="['monotorName', {rules:[{required: true, message: '请输入设备名称'}]}]" />
      </a-form-item>
      <a-form-item
        label="楼层名称"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-select
          placeholder="请选择"
          v-decorator="['floorName', {rules:[{required: true, message: '请输入楼层名称'}]}]"
          @change="floorno">
          <a-select-option v-for="item in floorData" :key="item.value">
            {{ item.label }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        label="类型"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-select
          placeholder="请选择"
          v-decorator="['name', {rules:[{required: true, message: '请输入类型'}]}]"
          :disabled="true"
        >
        </a-select>
      </a-form-item>
      <a-form-item
        label="房间信息"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <div >
          <a-select
            placeholder="请选择"
            v-decorator="['roomName', {rules:[{required: true, message: '请输入位置信息'}]}]"
            @change="floorno">
            <a-select-option v-for="item in roomData" :key="item.value">
              {{ item.label }}
            </a-select-option>
          </a-select>
        </div>
      </a-form-item>
      <a-form-item
        label="设备状态"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-select
          placeholder="请选择"
          v-decorator="['status', {rules:[{required: true, message: '请输入设备状态'}]}]"
          @change="func">
          <a-select-option value="1">在运</a-select-option>
          <a-select-option value="2">停运</a-select-option>
          <a-select-option value="0">无设备</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        label="运行状态"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-select
          placeholder="请选择"
          v-decorator="['equipStatus3', {rules:[{required: true, message: '请输入运行状态'}]}]"
          @change="func">
          <a-select-option value="1">开</a-select-option>
          <a-select-option value="0">关</a-select-option>
        </a-select>
        <!-- <a-input v-decorator="['equipStatus3', {rules:[{required: true, message: '请输入设备状态'}]}]" /> -->
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import pick from 'lodash.pick'
import { GetBuilding, GetFloor, GetRoom } from '@/api/archives/MonitorPoint'

var BuildingOptions = []
const floorData = []
const roomData = []

export default {
  name: 'AirconditionsystemForm',
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
      form: this.$form.createForm(this),
      BuildingOptions,
      floorData,
      roomData
    }
  },
  mounted: function () {
  this.getbuilding()
  },
  methods: {
    update (record) {
      this.visible = true
      console.log('带来表的数据', record)
      setTimeout(() => {
      if (record) {
        this.form.setFieldsValue(pick(record, ['buildingName', 'monotorName', 'floorName', 'name', 'roomName', 'status', 'equipStatus3']))
      }
      }, 100)
    },
      onCancel () {
      this.visible = false
      this.form.resetFields()
    },
    handleSubmit () {
      this.visible = false
      const { form: { validateFields } } = this
      validateFields((errors, values) => {
          console.log('values', values)
          console.log('errors', errors)
        if (!errors) {
        }
      })
    },
    getbuilding () {
    GetBuilding().then(res => {
        this.BuildingOptions = res.result
        console.log('楼栋名称：', this.BuildingOptions)
      })
    },
    buliding (value) {
      var bulidingno = value
      GetFloor({ 'builingNo': bulidingno }).then(response => {
        this.floorData = response.result
        console.log('楼层号', this.floorData)
      })
      console.log(bulidingno)
    },
    floorno (value) {
      var floorno = value
      console.log('楼层号', floorno)
    GetRoom({ 'floorNo': floorno }).then(response => {
        this.roomData = response.result
        console.log('房间号', this.roomData)
      })
    }
  }
}
</script>
