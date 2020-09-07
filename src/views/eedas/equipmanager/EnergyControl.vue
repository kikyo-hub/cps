<template>
  <a-card title="能源控制器" style="width: 100%;height:100%;">
    <Tree
      v-model="checkedKeys"
      :checkable="true"
      :tree-data="orgTree"
      @titleClick="handleTitleClick"
      @select="onSelectequip"
      @check="onCheckequip"
      show-icon
      style="min-height:617px;max-height:617px;margin-left:-15%;margin-top:-10%">
      <a-icon slot="box" type="box-plot" theme="twoTone"/>
      <a-icon slot="config" type="profile" theme="twoTone" />
      <a-icon slot="real" type="trademark-circle" theme="twoTone" />
      <a-icon slot="daydata" type="reconciliation" theme="twoTone" />
      <a-icon slot="cavuel" type="up-square" theme="twoTone" />
    </Tree>
  </a-card>
</template>

<script>
import bus from '@/store/app/global.js'
import { Tree } from 'ant-design-vue'
import { getEquipdata } from '@/api/archives/MonitorEquip'

export default {

  components: {
    Tree
  },
  data () {
    return {
      checkedKeys: [],
      treekey: '',
      orgTree: [],
      alldata: [],
      chanagedata: []
    }
  },
  created () {
      getEquipdata().then(res => {
      this.treekey = res.result[0].commAddress
      this.alldata = res
      const data = []
      for (let i = 0; i < res.result.length; i++) {
        data.push({
          'key': 'key-01-' + res.result[i].commAddress,
          'title': res.result[i].equipName,
           slots: {
            'icon': 'box'
           },
          'id': res.result[i].commAddress,
          'text': res.result[i].commAddress,
          'group': true
        })
      }
      this.orgTree = data
    })
  },
  mounted () {
  },
  methods: {
    selectEquip (selectKeys) {
      const select = JSON.parse(JSON.stringify(this.checkedKeys))
      const addresses = this.orgTree.filter((item, index, arr) => {
         return select.includes(item.key)
      })
      bus.state.controlss = addresses.map((ele, index) => { return { 'address': ele.id, 'name': ele.title } })
      this.chanagedata = bus.state.controlss
      // console.log(bus.state.controlss)
    },
    onSelectequip (selectedKeys, e) {
      this.checkedKeys = selectedKeys
      this.selectEquip(selectedKeys)
    },
    onCheckequip (checkedKeys, e) {
      // console.log(e)
      // const selectdata = []
      // selectdata.push({
      //   'key': e.node.value
      // })
      this.selectEquip(checkedKeys)
    },
     handleTitleClick (item) {
        this.checkedKeys = item
    }
  }
}
</script>
