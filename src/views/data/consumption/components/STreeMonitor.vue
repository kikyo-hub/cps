<template>
  <s-tree
    :dataSource="orgTree"
    :openKeys.sync="openKeys"
    :search="false"
    @click="handleClick"
    style="min-height:900px;max-height:900px;overflowY:scroll;"></s-tree>
</template>
<script>
import { getOrgTreeOfEletric } from '@/api/data/humidity'
import STree from '@/components/Tree/Tree'
export default {
    components: {
    STree
  },
    data () {
        return {
          treekey: '',
            openKeys: ['key-01'],
            orgTree: []
        }
    },
    created () {
        getOrgTreeOfEletric().then(res => {
      const data1 = []
      const data = []
      data1.push({ 'key': 'key-01',
          'title': '监测点',
          'icon': null,
          'children': [] })
      for (let i = 0; i < res.length; i++) {
        data.push({
          'key': 'key-01-' + res[i].monitorId,
          'title': res[i].monitorName,
          'icon': 'cluster',
          'id': res[i].monitorId,
          'group': true
        })
      }
      data1[0].children = data
      this.orgTree = data1
    })
    },
    methods: {
        handleClick (e) {
          this.treekey = e.key.substring(7)
            console.log('handleClick', e.key.substring(7))
            this.$emit('test', e.key.substring(7))
            // console.log(this.$parent)
        }
    }
}
</script>
