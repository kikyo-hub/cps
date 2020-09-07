<template>
  <a-card :bordered="true" :style="{ height: '100%' }">
    <div>
      <u>
        <h3>
          <a @click="$router.go(-1)">返回</a>
          <a v-if="isAdd === false" style="float:right" @click="submitData">更新</a>
          <a v-if="isAdd" style="float:right" @click="submitData">新增</a>
        </h3>
      </u>
    </div>
    <a-form :form="form" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-item
        label="诊断点编号"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        style="display:none;"
      >
        <a-input v-decorator="['diagnosisId', {rules:[{required: false, message: '诊断点编号'}]}]" />
      </a-form-item>
      <a-form-item label="诊断点名称" :labelCol="labelCol" :wrapperCol="wrapperCol" hasFeedback>
        <a-input v-decorator="['diagnosisName', {rules:[{required: true, message: '诊断点名称'}]}]" />
      </a-form-item>
      <a-form-item label="诊断规则" :labelCol="labelCol" :wrapperCol="wrapperCol" hasFeedback>
        <!-- <a-input v-decorator="['diagnosisRuleId', {rules:[{required: true, message: '诊断规则'}]}]" /> -->
        <a-select
          mode="multiple"
          placeholder="请选择 诊断规则"
          v-decorator="['diagnosisRuleList', {rules:[{required: true, message: '诊断规则'}]}]"
        >
          <!-- :default-value="['a1', 'b2']" -->
          <!--  -->
          <a-select-option v-for="item in diagnosisRuleOptions" :key="item.key" :value="item.value">
            {{ item.display }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="诊断点类型" :labelCol="labelCol" :wrapperCol="wrapperCol" hasFeedback>
        <a-select
          placeholder="请选择 诊断点类型"
          v-decorator="['diagnosisType', {rules:[{required: true, message: '需选择 诊断点类型'}]}]"
        >
          <a-select-option v-for="item in diagnosisTypeOptions" :key="item.key" :value="item.value">
            {{ item.display }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <!-- <a-form-item label="楼栋号" :labelCol="labelCol" :wrapperCol="wrapperCol" hasFeedback>
        <a-select
          placeholder="请选择 楼栋号"
          v-decorator="['buildingNo', {rules:[{required: false, message: '需选择 楼栋号'}]}]"
        >
          <a-select-option v-for="item in BuildingOptions" :key="item.key" :value="item.value">
            {{ item.display }}
          </a-select-option>
        </a-select>
      </a-form-item> -->
    </a-form>
    <a-row type="flex" justify="center">
      <a-col :md="13" :sm="24">
        <a-card :bordered="true" title="关联监测点">
          <a-table
            @change="handleTableChange"
            :loading="loading"
            :pagination="pagination"
            :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
            :columns="columns"
            :data-source="monitorPointData"
            row-key="monitorId" >
            <div
              slot="monitorIdFilterDropdown"
              style="padding: 8px"
            >
              <a-input
                :placeholder="`输入设备地址`"
                v-model="parameter.monitorId"
                style="width: 188px; margin-bottom: 8px; display: block;"
              />
              <a-button
                type="primary"
                icon="search"
                size="small"
                style="width: 90px; margin-right: 8px"
                @click="getMonitorPoint"
              >
                查询
              </a-button>
              <a-button size="small" style="width: 90px" @click="() => { parameter.monitorId = '' ; getMonitorPoint() }">
                重置
              </a-button>
            </div>
            <div
              slot="monitorNameFilterDropdown"
              style="padding: 8px"
            >
              <a-input
                :placeholder="`输入设备名称`"
                v-model="parameter.monitorName"
                style="width: 188px; margin-bottom: 8px; display: block;"
              />
              <a-button
                type="primary"
                icon="search"
                size="small"
                style="width: 90px; margin-right: 8px"
                @click="getMonitorPoint"
              >
                查询
              </a-button>
              <a-button size="small" style="width: 90px" @click="() => { parameter.monitorName = '' ; getMonitorPoint() }">
                重置
              </a-button>
            </div>
            <div
              slot="deviceTypeDescFilterDropdown"
              style="padding: 8px"
            >
              <a-select
                style="width:130PX"
                placeholder="用能设备类型"
                @change="getMonitorPoint"
                v-model="parameter.deviceType"
              >
                <a-select-option key="" value="">所有</a-select-option>
                <a-select-option v-for="item in energyDeviceType" :key="item.key" :value="item.value">
                  {{ item.display }}
                </a-select-option>
              </a-select>
            </div>
            <a-icon
              slot="filterIcon"
              slot-scope="filtered"
              type="search"
              :style="{ color: filtered ? '#108ee9' : undefined }"
            />
          </a-table>
        </a-card>
      </a-col>
    </a-row>
  </a-card>
</template>

<script>
import pick from 'lodash.pick'
import { GetBuildingOption, GetMonitorBinding, GetEnergyDeviceTypeCol } from '@/api/archives/MonitorPoint'
import { GetUpEquipOptions } from '@/api/archives/MonitorEquip'
import { UpdDigP, InsDigP, GetDiagnosisType, getDiagnosisRuleOptions, GetMonitorPointPage } from '@/api/archives/DiagnosticPoint'
// row-key="diagnosisId"
// key="diagnosisId"
export default {
  // props: {
  //   record: {
  //     type: Object,
  //     default: null
  //   }
  // },
  data () {
    return {
      parameter: {
        pageNo: 1,
        pageSize: 5,
        deviceType: '',
        upEquipId: '',
        monitorId: '',
        monitorName: ''
      },
      diagnosisTypeOptions: [{ key: '', val: '', display: '' }],
      BuildingOptions: [{ key: '', val: '', display: '' }],
      diagnosisRuleOptions: [{ key: '', val: '', display: '' }],
      UpEquipOptions: [{ key: '', val: '', display: '' }],
      visible: false,
      form: this.$form.createForm(this),
      // form2: this.$form.createForm(this),
      labelCol: { xs: { span: 24 }, sm: { span: 8 } },
      wrapperCol: { xs: { span: 24 }, sm: { span: 10 } },
      columns: [
        {
          title: '设备地址',
          dataIndex: 'monitorId',
          scopedSlots: {
            filterDropdown: 'monitorIdFilterDropdown',
            filterIcon: 'filterIcon'
          }
        },
        {
          title: '监测点名',
          dataIndex: 'monitorName',
          scopedSlots: {
            filterDropdown: 'monitorNameFilterDropdown',
            filterIcon: 'filterIcon'
          }
        },
        {
          title: '监测点类型',
          dataIndex: 'deviceTypeDesc',
          scopedSlots: {
            filterDropdown: 'deviceTypeDescFilterDropdown'
          }
        }
      ],
      monitorPointData: [],
      selectedRowKeys: [],
      loading: false,
      pagination: { pageSize: 5, current: 1, total: 0 }, // pageSize: 5, current: 2, total: 123 || pageSize: '', current: '', total: ''
      isAdd: true,
      energyDeviceType: {}
    }
  },
  mounted () {
    this.getOptions()
    this.getMonitorPoint()
    this.createPage()
    // if (this.record) {
    //   this.form.setFieldsValue(pick(this.record, ['diagnosisId', 'diagnosisName', 'diagnosisRuleId', 'diagnosisType', 'buildingNo']))
    // }
  },
  methods: {
    createPage () {
      if (this.$route.params.record === undefined || this.$route.params.record === null) {
        this.isAdd = true
        // 新增
        console.log('新增')
      } else {
        this.isAdd = false
        // 修改
        console.log('修改')
        console.log('this.$route.params.record', JSON.stringify(this.$route.params.record, null, 2))
        var record = this.$route.params.record
        this.getAlreadyBinding(record.diagnosisId)
        this.form.setFieldsValue(pick(record, ['diagnosisId', 'diagnosisName', 'diagnosisType', 'buildingNo']))
        var diagnosisRuleList = []
        for (let i = 0; i < record.diagnosisRuleList.length; i++) {
          diagnosisRuleList[i] = record.diagnosisRuleList[i].value
        }
        this.form.setFieldsValue({ diagnosisRuleList: diagnosisRuleList })
      }
    },
    onSelectChange (selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys
    },
    getMonitorPoint () {
      // const { form2: { validateFields } } = this
      // validateFields((errors, values) => {
        // console.log('values', JSON.stringify(values))
        // this.parameter.deviceType = ''
        // this.parameter.upEquipId = ''
        // this.parameter.monitorId = ''
        // this.parameter.monitorName = ''
        // if (values.deviceType) {
        //   this.parameter.deviceType = values.deviceType
        // }
        // if (values.upEquipId) {
        //   this.parameter.upEquipId = values.upEquipId
        // }
        // if (values.monitorId) {
        //   this.parameter.monitorId = values.monitorId
        // }
        // if (values.monitorName) {
        //   this.parameter.monitorName = values.monitorName
        // }
        // console.log(this.parameter)
        GetMonitorPointPage(this.parameter).then(res => {
          // console.log('GetMonitorPointPage', JSON.stringify(res, null, 2))
          this.monitorPointData = res.result.data
          this.pagination.pageSize = res.result.pageSize
          this.pagination.current = res.result.pageNo
          this.pagination.total = res.result.totalCount
          this.loading = false
        })
      // })
      this.loading = true
    },
    getAlreadyBinding (diagnosisId) {
      GetMonitorBinding({ pageNo: 1, pageSize: 999, diagnosisId: diagnosisId, upEquipId: '' }).then(res => {
        // console.log('GetMonitorBinding', JSON.stringify(res, null, 2))
        var data = res.result.data
        for (let index = 0; index < data.length; index++) {
          this.selectedRowKeys[index] = data[index].monitorId
        }
      })
    },
    handleTableChange (pagination) {
      this.parameter.pageNo = pagination.current
      this.getMonitorPoint()
    },
    getOptions () {
      GetDiagnosisType().then(res => {
        this.diagnosisTypeOptions = res.result.selectable
      })
      GetBuildingOption().then(res => {
        this.BuildingOptions = res.result
      })
      getDiagnosisRuleOptions().then(res => {
        this.diagnosisRuleOptions = res.result
      })
      GetUpEquipOptions().then(response => {
        this.UpEquipOptions = response.result
      })
      GetEnergyDeviceTypeCol().then(response => {
        this.energyDeviceType = response.result.selectable
      })
    },
    onUpEquipChange () {
      this.getMonitorPoint()
    },
    // add () {
    //   this.visible = true
    // },
    // update (record) {
    //   this.visible = true
    //   setTimeout(() => {
    //     if (record) {
    //       this.form.setFieldsValue(pick(record, ['diagnosisId', 'diagnosisName', 'diagnosisType', 'buildingNo']))
    //       // diagnosisRuleList
    //       var diagnosisRuleList = []
    //       for (let i = 0; i < record.diagnosisRuleList.length; i++) {
    //         diagnosisRuleList[i] = record.diagnosisRuleList[i].value
    //       }
    //       this.form.setFieldsValue({ diagnosisRuleList: diagnosisRuleList })
    //     }
    //   }, 100)
    // },
    // onCancel () {
    //   this.visible = false
    //   this.form.resetFields()
    // },
    submitData () {
      const {
        form: { validateFields }
      } = this
      validateFields((errors, values) => {
        if (!errors) {
          values.monitorDMRids = []
          for (let i = 0; i < this.selectedRowKeys.length; i++) {
            values.monitorDMRids[i] = this.selectedRowKeys[i]
          }
          if (!values.diagnosisId) {
            console.log(values)
            InsDigP(values).then(res => {
              if (res.code === 0) {
                this.$message.success('新增成功')
                // this.$emit('ok', true)
                // this.form.resetFields()
              } else {
                this.$message.warning('新增失败')
              }
            })
          } else {
            UpdDigP(values).then(response => {
              if (response.code === 0) {
                this.$message.success('更新成功')
                // this.$emit('ok', true)
                // this.form.resetFields()
              } else {
                this.$message.warning('数据处理失败')
              }
            })
          }
        }
      })
    }
  },
  watch: {
    /*
      'selectedRows': function (selectedRows) {
        this.needTotalList = this.needTotalList.map(item => {
          return {
            ...item,
            total: selectedRows.reduce( (sum, val) => {
              return sum + val[item.dataIndex]
            }, 0)
          }
        })
      }
      */
  }
}
</script>
