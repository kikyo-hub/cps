<template >
  <div >
    <a-button type="primary" style="margin-left:1%;" @click="queryAllequip" icon="select">查询</a-button>
    <a-button type="primary" style="margin-left:55%;margin-top:1%" @click="CallClickF10" icon="ci">召测</a-button>
    <a-button type="primary" style="margin-left:1%;margin-top:1%" @click="Issue">下发</a-button>
    <a-button type="primary" style="margin-left:1%;margin-top:1%">按档案重新下发</a-button>
    <a-divider orientation="left" />
    <a-table
      :border="true"
      :columns="columns"
      :data-source="Equipdata"
      row-key="commAddress"
      :pagination="pagination"
      :loading="loading"
      style="margin-top:1%"
      :rowSelection="{ selectedRowKeys: selectedRowKeysArray, onChange: onSelectChange, type: 'radio' }"
    >
      <span slot="customTitle"><a-icon type="code" theme="twoTone" two-tone-color="#52c41a" /> 通信地址</span>
      <span slot="equipTypeDescTitle"><a-icon type="sliders" theme="twoTone" two-tone-color="#52c41a"/> 设备类型</span>
      <span slot="equipNameTitle"><a-icon type="smile" theme="twoTone" two-tone-color="#52c41a"/> 设备名称</span>
      <span slot="commModeDescTitle"><a-icon type="api" theme="twoTone" two-tone-color="#52c41a"/> 通信方式</span>
      <span slot="protocolTypeDescTitle"><a-icon type="tool" theme="twoTone" two-tone-color="#52c41a"/> 规约类型</span>
      <span slot="states" slot-scope="states">
        <a-tag :color="states ==='成功' ? 'green' : 'red'" >
          {{ states.toUpperCase() }}
        </a-tag>
      </span>
    </a-table>
  </div>
</template>

<script>
import { getMeterArchives, issue } from '@/api/archives/MonitorEquip'
import { getAllSubordinateEquipment } from '@/api/archives/equip'
// import MonitorEquipForm from '../equip/MonitorEquipForm'
const Equipdata = []
// eslint-disable-next-line no-unused-vars
const selectedRowKeysArray = []
const selectedRowmsg = []
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['address'],
  components: {
    // MonitorEquipForm
  },
  data () {
    return {
      selectedRowmsg,
      selectedRowKeysArray,
      Equipdata,
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
        pageSize: 6,
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
        },
        {
          title: '匹配结果',
          slots: { title: 'states' },
          scopedSlots: { customRender: 'states' },
          dataIndex: 'macthResult',
          key: 'macthResult',
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
    CallClickF10 () {
      this.disa = true
      setInterval(() => {
        this.disa = false
      }, 30000)
      getMeterArchives(this.address).then(res => {
        console.log(res.result)
       if (res.result.length === 14) {
         this.$message.error('召测数据失败，可能终端不在线')
       this.disa = false
        } else {
            this.pagination.pageSize = res.result.pageSize
            this.pagination.total = res.result.totalCount
            this.Equipdata = res.result.data
           console.log(this.Equipdata)
          for (let i = 0; i < this.Equipdata.length; i += 1) {
               if (this.Equipdata[i].macthResult === 'true') {
                  this.Equipdata[i].macthResult = '成功'
              }
            }
            this.$message.info('成功')
        this.disa = false
        }
      })
    },
    queryAllequip (index) {
      this.queryParam.commAddress = this.address
      getAllSubordinateEquipment(this.queryParam).then(response => {
        console.log(response.result.data)
          this.pagination.pageSize = response.result.pageSize
          this.pagination.total = response.result.totalCount
          this.Equipdata = response.result.data
          // console.log('查询参数', parameter, this.queryParam)
          for (let i = 0; i < this.Equipdata.length; i += 1) {
              if (this.Equipdata[i].macthResult === 'true') {
                  this.Equipdata[i].macthResult = '成功'
              }
            }
        })
    },
     selectequip (pageno, pagesize) {
       // console.log(this.address)
      this.queryParam.commAddress = this.address
      this.queryParam.pageSize = pagesize
      this.queryParam.pageNo = pageno
      getAllSubordinateEquipment(this.queryParam).then(response => {
          this.Equipdata = response.result.data
              for (let i = 0; i < this.Equipdata.length; i += 1) {
               if (this.Equipdata[i].macthResult === 'true') {
                  this.Equipdata[i].macthResult = '成功'
              }
            }
        })
    },
    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeysArray = selectedRowKeys
      this.selectedRowmsg = selectedRows
      console.log(this.selectedRowmsg)
      return this.selectedRowKeysArray
    },
    Issue () {
    console.log(this.selectedRowmsg)
    issue(this.selectedRowmsg[0]).then(res => {
      this.$message.info(res.result)
    })
    }
  }
}
</script>

<style lang="less">
</style>
