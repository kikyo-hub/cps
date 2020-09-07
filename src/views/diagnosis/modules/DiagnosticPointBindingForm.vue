<template>
  <a-form layout="inline">
    <a-form-item label="上级设备">
      <a-select @change="onUpEquipChange" v-model="queryParam.upEquipId" placeholder="请选择 上级设备" style="width:150px;margin-left:10px">
        <a-select-option key="-1" value="-1">全部</a-select-option>
        <a-select-option v-for="UpEquip in UpEquipOptions" :key="UpEquip.key" :value="UpEquip.value">{{ UpEquip.display }}</a-select-option>
      </a-select>
    </a-form-item>
    <s-table
      ref="table"
      row-key="monitorId"
      size="default"
      :columns="columns"
      :data="loadData"
      :alert="options.alert"
      :rowSelection="options.rowSelection"
      showPagination="auto"
    >
    </s-table>
  </a-form>
</template>

<script>
import { STable } from '@/components'
import { GetMonitorUnbind } from '@/api/archives/MonitorPoint'
import { GetUpEquipOptions } from '@/api/archives/MonitorEquip'
import { BandingDM } from '@/api/archives/DiagnosticPoint'
export default {
  name: 'DiagnosticPointBindingForm',
  components: {
    STable
  },
  props: {
    record: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      queryParam: {
        diagnosisId: '',
        upEquipId: ''
      },
      // 表头
      columns: [
        {
          title: '监测点名称',
          dataIndex: 'monitorName'
        },
        {
          title: '监测点描述',
          dataIndex: 'monitorDesc'
        },
        {
          title: '设备地址',
          dataIndex: 'monitorId'
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        this.queryParam.diagnosisId = this.record
        return GetMonitorUnbind(Object.assign(this.queryParam, parameter)).then(res => {
          console.log(JSON.stringify(res, null, 2))
          return res.result
        })
      },
      selectedRowKeys: [],
      selectedRows: [],
      options: {
        alert: { show: true, clear: () => { this.selectedRowKeys = [] } },
        rowSelection: {
          selectedRowKeys: this.selectedRowKeys,
          onChange: this.onSelectChange
        }
      },
      optionAlertShow: false,
      UpEquipOptions: []
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      GetUpEquipOptions().then(response => {
        console.log(JSON.stringify(response.result, null, 2))
        this.UpEquipOptions = response.result
      })
    },
    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    onOk () {
      var monitor = this.selectedRowKeys
      var diagnosis = this.record
      BandingDM({ diagnosisId: diagnosis, monitorIds: monitor }).then(res => {
        if (res.code === 0) {
          this.$message.success('绑定成功')
            // this.visible = false
        } else {
          this.$message.warning('绑定失败')
        }
      })
    },
    onCancel () {
      return new Promise(resolve => {
        resolve(true)
      })
    },
    handleSubmit () {
      const { form: { validateFields } } = this
      // this.visible = true
      return validateFields((errors, values) => {
         return false
      })
    },
    onUpEquipChange () {
      this.$refs.table.refresh(true)
    }
  }
}
</script>
