<template>
  <a-form @submit="handleSubmit" :form="form">
    <a-form-item
      label="monitorId"
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
      style="display:none;"
    >
      <a-input v-decorator="['monitorId', {rules:[{required: true, message: 'monitorId'}]}]" />
    </a-form-item>
    <a-form-item
      label="监测点名称"
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
    >
      <a-input v-decorator="['monitorName', {rules:[{required: true, message: '请输入监测点名称'}]}]" />
    </a-form-item>
    <a-form-item
      label="用能设备类型"
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
      hasFeedback
    >
      <a-select
        placeholder="请选择 用能设备类型"
        v-decorator="['deviceType', {rules:[{required: true, message: '需选择 用能设备类型'}]}]"
        style="width: 240px">
        <a-select-option v-for="item in energyDeviceType" :key="item.key" :value="item.value">
          {{ item.display }}
        </a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item
      label="监控计量设备地址"
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
    >
      <a-input-search @search="showModal" v-decorator="['equipAddress', {rules:[{required: true, message: '请输入监控计量设备地址'}]}]"/>
    </a-form-item>
    <a-form-item
      label="采集规则"
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
    >
      <a-select
        placeholder="请选择 采集规则"
        v-decorator="['collectionRuleId', {rules:[{required: true, message: '需选择 采集规则'}]}]"
        style="width: 240px">
        <a-select-option v-for="item in collectionRule" :key="item.key" :value="item.value">
          {{ item.display }}
        </a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item
      label="监测点描述"
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
    >
      <a-input v-decorator="['monitorDesc', {rules:[{required: true, message: '请输入监测点描述'}]}]" />
    </a-form-item>
    <a-form-item
      label="安装位置"
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
    >
      <cascader
        :options="Building"
        :load-data="loadCData"
        placeholder="请选择"
        change-on-select
        @change="onChange"
        v-decorator="['location', {rules:[{required: true, message: '请选择安装位置'}]}]"
      />
    </a-form-item>
    <!-- <a-form-item
      label="所属楼栋"
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
    >
      <a-input v-decorator="['buildingNo', {rules:[{required: true, message: '请输入所属楼栋'}]}]" />
    </a-form-item>
    <a-form-item
      label="所属楼层"
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
    >
      <a-input v-decorator="['floorNo', {rules:[{required: true, message: '请输入所属楼层'}]}]" />
    </a-form-item>
    <a-form-item
      label="所属房间"
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
    >
      <a-input v-decorator="['roomNo', {rules:[{required: true, message: '请输入所属房间'}]}]" />
    </a-form-item>
    <a-form-item
      label="创建人员"
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
    >
      <a-input v-decorator="['creator', {rules:[{required: true, message: '请输入创建人员'}]}]" />
    </a-form-item> -->
    <a-modal
      title="选择监控计量设备"
      :visible="visible2"
      :confirm-loading="confirmLoading"
      @cancel="handleCancel2"
      :footer="null"
      :width="1024"
    >
      <s-table
        ref="table"
        row-key="equipId"
        size="default"
        :columns="columns"
        :data="loadData"
      >
        <span slot="action" slot-scope="text, record2">
          <template>
            <a @click="choseThis(record2)">选择</a>
          </template>
        </span>
      </s-table>
    </a-modal>
  </a-form>
</template>

<script>
import pick from 'lodash.pick'
import { STable } from '@/components'
import { GetEnergyDeviceTypeCol, UpdateMonitorPoint, GetPEquipNotM, GetBuilding, GetFloor, GetRoom, GetCollRule } from '@/api/archives/MonitorPoint'
import { cascader } from 'ant-design-vue'
export default {
  components: {
    STable,
    cascader
  },
  name: 'MonitorPointEditForm',
  props: {
    record: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      Building: [],
      visible2: false,
      confirmLoading: false,
      queryParam: {},
      parameter: {},
      energyDeviceType: {},
      collectionRule: {},
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 13 }
      },
      // 表头
      columns: [
        {
          title: '通信地址',
          dataIndex: 'commAddress',
          key: 'commAddress',
          align: 'center'
        },
        {
          title: '设备类型',
          dataIndex: 'equipTypeDesc',
          key: 'equipType',
          align: 'center'
        },
        {
          title: '设备名称',
          dataIndex: 'equipName',
          key: 'equipName',
          align: 'center'
        },
        {
          title: '通信方式',
          dataIndex: 'commModeDesc',
          key: 'commMode',
          align: 'center'
        },
        {
          title: '规约类型',
          dataIndex: 'protocolTypeDesc',
          key: 'protocolType',
          align: 'center'
        },
        {
          title: '设备型号',
          dataIndex: 'equipModeDesc',
          key: 'equipMode',
          align: 'center'
        },
        {
          title: '操作',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' },
          fixed: 'right',
          align: 'center',
          width: 150
        }
      ],
      loadData: parameter => {
        return GetPEquipNotM(Object.assign(parameter, this.queryParam)).then(response => {
          console.log('查询参数', parameter, this.queryParam)
          console.log(JSON.stringify(response.result))
          return response.result
        })
      },
      form: this.$form.createForm(this)
    }
  },
  mounted () {
    this.getData()
    console.log('record:', this.record)
    if (this.record) {
      var equipAddress = [this.record.buildingNo, this.record.floorNo, this.record.roomNo]
      this.form.setFieldsValue({ 'equipAddress': equipAddress })
      this.form.setFieldsValue(pick(this.record, ['monitorId', 'monitorName', 'deviceType', 'equipAddress', 'collectionRuleId', 'monitorDesc', 'creator']))
    }
  },
  methods: {
    onChange (value) {
      console.log(value)
    },
    loadCData (selectedOptions) {
      console.log('selectedOptions', selectedOptions)
      const targetOption = selectedOptions[selectedOptions.length - 1]
      targetOption.loading = true
      var rrr = {}
      if (selectedOptions.length === 1) {
        GetFloor({ 'builingNo': selectedOptions[0].value }).then(response => {
          rrr = response.result
        })
      }
      if (selectedOptions.length === 2) {
        GetRoom({ 'floorNo': selectedOptions[1].value }).then(response => {
          rrr = response.result
        })
      }
      setTimeout(() => {
        targetOption.loading = false
        targetOption.children = rrr
        this.Building = [...this.Building]
      }, 1000)
    },
    showModal () {
      this.visible2 = true
    },
    handleCancel2 (e) {
      this.visible2 = false
    },
    choseThis (record2) {
      console.log(record2)
      this.form.setFieldsValue({ 'equipAddress': record2.commAddress })
      this.visible2 = false
    },
    getData () {
      GetEnergyDeviceTypeCol().then(response => {
        this.energyDeviceType = response.result.selectable
      })
      GetBuilding().then(response => {
        this.Building = response.result
      })
      GetCollRule().then(response => {
        this.collectionRule = response.result
      })
    },
    onOk () {
      const { form: { validateFields } } = this
      return new Promise(resolve => {
        validateFields((errors, values) => {
          if (!errors) {
            console.log('values', JSON.stringify(values))
            UpdateMonitorPoint(values).then(res => {
              if (res.code === 0) {
                this.$message.success('更新成功')
                  resolve(true)
              } else {
                this.$message.warning('更新失败')
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
