<template>
  <a-modal title="诊断点信息" :width="640" :visible="visible" @ok="handleSubmit" @cancel="onCancel">
    <a-form :form="form">
      <a-form-item
        label="monitorId"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        style="display:none;"
      >
        <a-input v-decorator="['monitorId', {rules:[{required: false, message: 'monitorId'}]}]" />
      </a-form-item>
      <a-form-item
        label="监测点名称"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        hasFeedback
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
          v-decorator="['deviceType', {rules:[{required: true, message: '需选择 用能设备类型'}]}]" >
          <a-select-option v-for="item in energyDeviceType" :key="item.key" :value="item.value">
            {{ item.display }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        label="监控计量设备地址"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        hasFeedback
      >
        <a-input-search :readOnly="true" @search="showModal" v-decorator="['equipAddress', {rules:[{required: true, message: '请输入监控计量设备地址'}]}]"/>
      </a-form-item>
      <!-- <a-form-item
        label="采集规则"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        hasFeedback
      >
        <a-select
          placeholder="请选择 采集规则"
          v-decorator="['collectionRuleId', {rules:[{required: true, message: '需选择 采集规则'}]}]" >
          <a-select-option v-for="item in collectionRule" :key="item.key" :value="item.value">
            {{ item.display }}
          </a-select-option>
        </a-select>
      </a-form-item> -->
      <a-form-item label="采集规则" :labelCol="labelCol" :wrapperCol="wrapperCol" hasFeedback>
        <!-- <a-input v-decorator="['diagnosisRuleId', {rules:[{required: true, message: '采集规则'}]}]" /> -->
        <a-select
          mode="multiple"
          placeholder="请选择 采集规则"
          v-decorator="['collectionRuleList', {rules:[{required: true, message: '采集规则'}]}]"
        >
          <!-- :default-value="['a1', 'b2']" -->
          <!--  -->
          <a-select-option v-for="item in collectionRule" :key="item.key" :value="item.value">
            {{ item.display }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        label="监测点描述"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        hasFeedback
      >
        <a-input v-decorator="['monitorDesc', {rules:[{required: true, message: '请输入监测点描述'}]}]" />
      </a-form-item>
      <a-form-item
        label="安装位置"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        hasFeedback
      >
        <!-- @change="onChange" -->
        <!-- :load-data="loadCData" -->
        <cascader
          :options="Building"
          placeholder="安装位置"
          change-on-select
          v-decorator="['location', {rules:[{required: true, message: '请选择安装位置'}]}]"
        />
      </a-form-item>
      <a-modal
        title="选择监控计量设备"
        :visible="visible2"
        :confirm-loading="confirmLoading"
        @cancel="handleCancel2"
        :footer="null"
        :width="1024"
        hasFeedback
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
  </a-modal>
</template>

<script>
import pick from 'lodash.pick'
import { STable } from '@/components'
import { GetEnergyDeviceTypeCol, UpdateMonitorPoint, GetAddress, GetFloor, GetRoom, GetCollRule, GetPEquipNotM, AddMonitorPoint } from '@/api/archives/MonitorPoint'
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
      parameter: {},
      visible: false,
      form: this.$form.createForm(this),
      Building: [],
      visible2: false,
      confirmLoading: false,
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
          return response.result
        })
      }
    }
  },
  mounted () {
    this.getData()
    // if (this.record) {
    //   var equipAddress = [this.record.buildingNo, this.record.floorNo, this.record.roomNo]
    //   this.form.setFieldsValue({ 'equipAddress': equipAddress })
    //   this.form.setFieldsValue(pick(this.record, ['monitorId', 'monitorName', 'deviceType', 'equipAddress', 'collectionRuleId', 'monitorDesc', 'creator']))
    // }
  },
  methods: {
    add () {
      this.visible = true
    },
    update (record) {
      this.visible = true
      setTimeout(() => {
        if (record) {
          this.form.setFieldsValue(pick(record, ['monitorId', 'monitorName', 'deviceType', 'equipAddress', 'monitorDesc', 'creator']))//  'collectionRuleId',

          // collectionRuleList
          var collectionRuleList = []
          for (let i = 0; i < record.collectionRuleR.length; i++) {
            collectionRuleList[i] = record.collectionRuleR[i].COLLECTION_RULE_ID
          }
          this.form.setFieldsValue({ collectionRuleList: collectionRuleList })

          this.form.setFieldsValue({ 'location': [record.buildingNo, record.floorNo, record.roomNo] })
        }
      }, 100)
    },
    onCancel () {
      this.visible = false
      this.form.resetFields()
    },
    handleSubmit () {
      const { form: { validateFields } } = this
      validateFields((errors, values) => {
        if (!errors) {
          var par = {}
          par.monitorName = values.monitorName
          par.deviceType = values.deviceType
          par.equipAddress = values.equipAddress
          par.collectionRuleR = values.collectionRuleList
          par.monitorDesc = values.monitorDesc
          par.buildingNo = values.location[0]
          par.floorNo = values.location[1]
          par.roomNo = values.location[2]
          if (!values.monitorId) {
            // "monitorName":"1","deviceType":"1","equipAddress":"2","collectionRuleId":"2","monitorDesc":"2","buildingNo":"2","floorNo":"2","roomNo":"2","creator":"2"
            AddMonitorPoint(par).then(res => {
              if (res.code === 0) {
                this.$message.success('新增成功')
                this.$emit('ok', true)
                this.visible = false
                this.form.resetFields()
              } else {
                this.$message.warning('新增失败')
              }
            })
          } else {
            par.monitorId = values.monitorId
            UpdateMonitorPoint(par).then(res => {
              if (res.code === 0) {
                this.$message.success('更新成功')
                this.$emit('ok', true)
                this.visible = false
                this.form.resetFields()
              } else {
                this.$message.warning('更新失败')
              }
            })
          }
        }
      })
    },
    loadCData (selectedOptions) {
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
        // this.Building = [...this.Building]
      }, 300)
    },
    showModal () {
      this.visible2 = true
    },
    handleCancel2 (e) {
      this.visible2 = false
    },
    choseThis (record2) {
      this.form.setFieldsValue({ 'equipAddress': record2.commAddress })
      this.visible2 = false
    },
    getData () {
      GetEnergyDeviceTypeCol().then(response => {
        this.energyDeviceType = response.result.selectable
      })
      // GetBuilding().then(response => {
      //   this.Building = response.result
      // })
      GetAddress().then(res => {
        this.Building = res.result
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
    }
  }
}
</script>
