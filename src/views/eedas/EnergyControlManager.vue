<template>
  <a-card :bordered="true" style="height:100%;width: 100%;">
    <a-row>
      <a-col :span="4">
        <compoent :is="controller"></compoent>
      </a-col>
      <a-col :span="20">
        <compoent :is="dataitem"></compoent>
      </a-col>
    </a-row>
  </a-card>
</template>

<script>
import { STable } from '@/components'
import DetailList from '@/components/tools/DetailList'

const DetailListItem = DetailList.Item
export default {
  name: 'TreeList',
  components: {
    STable,
    DetailList,
    DetailListItem
  },
  data () {
    return {
      equiptypedata: { equiptypedata: '' },
      openKeys: ['key-01'],
      value: '',
      comp: '',
      controller: '',
      visible: false,
      treekey: '',
      alldata: [],
      pagination: { pageSize: 4 },
      address: ''
    }
  },
  created () {
     this.controller = () => import('./equipmanager/EnergyControl')
     this.dataitem = () => import('./equipmanager/DataItem')
  },
mounted () { // 在模板编译完成后执行
	},
  methods: {
    titleClick (e) {
    },
    onChange2 (date, dateString) {
      this.dateString = dateString
    },
    onSelectChange (selectedRowKeys) {
      //  console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
    },
    onSelect (selectedKeys, info) {
      console.log('selected', selectedKeys, info)
    },
    onCheck (checkedKeys, info) {
      console.log('onCheck', checkedKeys, info)
    },
    CallClick () {
    }
  }
}
</script>

<style lang="less">

</style>
