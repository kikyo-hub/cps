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
      <!-- <span slot="action" slot-scope="text, record2">
        <template>
          <a @click="choseThis(record2)">选择</a>
        </template>
      </span> -->
    </s-table>
  </a-form>
</template>

<script>
import { STable } from '@/components'
import { GetMonitorBinding } from '@/api/archives/MonitorPoint'
import { UnbindDM } from '@/api/archives/DiagnosticPoint'
import { GetUpEquipOptions } from '@/api/archives/MonitorEquip'
// import { insEquip, GetEquipTypeO, GetEquipCommModeO, GetEquipProtocolO, GetEquipModeOptions } from '@/api/archives/MonitorEquip'

export default {
  name: 'DiagnosticPointUnbindForm',
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
        return GetMonitorBinding(Object.assign(this.queryParam, parameter)).then(res => {
          return res.result
        })
      },
      selectedRowKeys: [],
      selectedRows: [],
      // custom table alert & rowSelection
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
      UnbindDM({ diagnosisId: diagnosis, monitorIds: monitor }).then(res => {
        if (res.code === 0) {
          this.$message.success('解绑成功')
            // this.visible = false
        } else {
          this.$message.warning('解绑失败')
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
