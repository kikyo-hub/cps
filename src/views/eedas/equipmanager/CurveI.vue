<template >
  <div >
    <a-button type="primary" style="margin-left:1%;margin-right:30%" @click="queryAllequip" icon="select">查询</a-button>
    召测时间：<a-range-picker @change="onChange" style="margin-left:1%;" :default-value="[moment(getCurrentData(), dateFormat), moment(getNextData(), dateFormat)]" :format="dateFormat"/>
    <a-button type="primary" style="margin-top:0%" @click="CallClickF10" icon="ci">召测</a-button>
    <a-table
      :border="true"
      :columns="columns"
      :data-source="Equipdata"
      row-key="commAddress"
      :pagination="pagination"
      :loading="loading"
      style="margin-top:1%"
      :row-selection="rowSelection"
    >
      <span slot="customTitle"><a-icon type="code" theme="twoTone" two-tone-color="#52c41a" /> 通信地址</span>
      <span slot="equipTypeDescTitle"><a-icon type="sliders" theme="twoTone" two-tone-color="#52c41a"/> 设备类型</span>
      <span slot="equipNameTitle"><a-icon type="smile" theme="twoTone" two-tone-color="#52c41a"/> 设备名称</span>
      <span slot="commModeDescTitle"><a-icon type="api" theme="twoTone" two-tone-color="#52c41a"/> 通信方式</span>
      <span slot="protocolTypeDescTitle"><a-icon type="tool" theme="twoTone" two-tone-color="#52c41a"/> 规约类型</span>
    </a-table>
  </div>
</template>

<script>
import moment from 'moment'
import { getAllSubordinateEquipment } from '@/api/archives/equip'
const Equipdata = []
  const rowSelection = {
  type: 'radio',
  width: 100,
  onSelect: (selectedRowKeys, selectedRows) => {
  console.log(selectedRowKeys, selectedRows)
  }
  }
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['address'],
  components: {
  },
  data () {
    return {
      rowSelection,
      Equipdata,
      dateFormat: 'YYYY-MM-DD HH:mm:ss',
      pagination: {
          current: 0,
          pageSize: 0,
          total: 0,
          onShowSizeChange: (current, pageSize) => {
             this.pagination.current = current
             this.pagination.pageSize = pageSize
             },
          onChange: (current, pageSize) => {
            this.pagination.current = current
            this.pagination.pageSize = pageSize
            this.selectequip(current, pageSize)
          }
      },
      queryParam: {
        commAddress: '',
        pageSize: 7,
        pageNo: 1
      },
      loading: false,
      columns: [
        {
          dataIndex: 'commAddress',
          key: 'commAddress',
          align: 'center',
          width: 250,
          slots: { title: 'customTitle' },
          scopedSlots: { customRender: 'commAddress' }
        },
        {
          slots: { title: 'equipTypeDescTitle' },
          scopedSlots: { customRender: 'equipTypeDesc' },
          dataIndex: 'equipTypeDesc',
          key: 'equipType',
          align: 'center',
          width: 250
        },
        {
          slots: { title: 'equipNameTitle' },
          scopedSlots: { customRender: 'equipName' },
          dataIndex: 'equipName',
          key: 'equipName',
          align: 'center',
          width: 250
        },
        {
          slots: { title: 'commModeDescTitle' },
          scopedSlots: { customRender: 'commModeDesc' },
          dataIndex: 'commModeDesc',
          key: 'commMode',
          align: 'center',
          width: 250
        },
        {
          slots: { title: 'protocolTypeDescTitle' },
          scopedSlots: { customRender: 'protocolTypeDesc' },
          dataIndex: 'protocolTypeDesc',
          key: 'protocolType',
          align: 'center',
          width: 250
        }
      ]
    }
  },
  created () {
  },
  mounted () {
  },
  methods: {
    moment,
    getCurrentData () {
    console.log(moment(new Date().toLocaleDateString()).format('YYYY-MM-DD HH:mm:ss'))
    return moment(new Date().toLocaleDateString()).format('YYYY-MM-DD HH:mm:ss')
    },
    getNextData () {
     return moment(new Date(new Date().setDate(new Date().getDate() + 1)).toLocaleDateString()).format('YYYY-MM-DD HH:mm:ss')
    },
    onChange (date, dateString) {
    console.log(date, dateString)
    },
    CallClickF10 () {
    },
    queryAllequip (index) {
      this.queryParam.commAddress = this.address
      console.log(this.queryParam.commAddress)
      getAllSubordinateEquipment(this.queryParam).then(response => {
          // console.log('查询参数', parameter, this.queryParam)
          this.pagination.pageSize = response.result.pageSize
          this.pagination.total = response.result.totalCount
          this.Equipdata = response.result.data
        })
    },
     selectequip (pageno, pagesize) {
       // console.log(this.address)
      this.queryParam.commAddress = this.address
      this.queryParam.pageSize = pagesize
      this.queryParam.pageNo = pageno
      getAllSubordinateEquipment(this.queryParam).then(response => {
          this.Equipdata = response.result.data
        })
    }
  },
 watch: {
    chanagedata: function (newVal, oldVal) {
        // 其他业务代码
        console.log(newVal)
    }
}
}
</script>

<style lang="less">
</style>
