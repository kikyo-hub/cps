<template>
  <a-form @submit="handleSubmit" :form="form">
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
    </a-form-item> -->
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
// import pick from 'lodash.pick'
import { STable } from '@/components'
import { GetEnergyDeviceTypeCol, AddMonitorPoint, GetPEquipNotM, GetBuilding, GetFloor, GetRoom, GetCollRule } from '@/api/archives/MonitorPoint'
import { cascader } from 'ant-design-vue'
export default {
  components: {
    STable,
    cascader
  },
  name: 'MonitorPointInsForm',
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
      parameter: {},
      queryParam: {},
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
          console.log('response', JSON.stringify(response.result))
          return response.result
        })
      },
      form: this.$form.createForm(this)
    }
  },
  mounted () {
    this.getData()
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
        // targetOption.children = [{ 'label': '楼层1', 'value': '1' }, { 'label': '楼层2', 'value': '2' }, { 'label': '楼层3', 'value': '3' }, { 'label': '楼层4', 'value': '4' }, { 'label': '楼层5', 'value': '5' }, { 'label': '楼层6', 'value': '6' }, { 'label': '楼层7', 'value': '7' }, { 'label': '楼层8', 'value': '8' }, { 'label': '楼层9', 'value': '9' }, { 'label': '楼层10', 'value': '10' }]
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
    handleOk (e) {
      this.ModalText = 'The modal will be closed after two seconds'
      this.confirmLoading = true
      setTimeout(() => {
        this.visible = false
        this.confirmLoading = false
      }, 2000)
    },
    handleCancel (e) {
      console.log('Clicked cancel button')
      this.visible = false
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
          // this.visible = true
      return new Promise(resolve => {
        validateFields((errors, values) => {
          if (!errors) {
            console.log('values', JSON.stringify(values))
            // "monitorName":"1","deviceType":"1","equipAddress":"2","collectionRuleId":"2","monitorDesc":"2","buildingNo":"2","floorNo":"2","roomNo":"2","creator":"2"
            var par = {}
            par.monitorName = values.monitorName
            par.deviceType = values.deviceType
            par.equipAddress = values.equipAddress
            par.collectionRuleId = values.collectionRuleId
            par.monitorDesc = values.monitorDesc
            par.buildingNo = values.location[0]
            par.floorNo = values.location[1]
            par.roomNo = values.location[2]
            AddMonitorPoint(par).then(res => {
              if (res.code === 0) {
                this.$message.success('新增成功')
                  // this.visible = false
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
    }
  }
}
</script>
