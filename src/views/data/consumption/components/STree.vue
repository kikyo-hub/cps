<template>
  <s-tree
    :dataSource="orgTree"
    :openKeys.sync="openKeys"
    :search="false"
    @click="handleClick"
    style="min-height:900px;max-height:900px;overflowY:scroll;"></s-tree>
</template>
<script>
import { getOrgTree } from '@/api/data/diagnosis'
import STree from '@/components/Tree/Tree'
export default {
    components: {
    STree
  },
    data () {
        return {
            openKeys: ['key-01'],
            orgTree: []
        }
    },
    created () {
        getOrgTree().then(res => {
      const data1 = []
      const data = []
      data1.push({ 'key': 'key-01',
          'title': '诊断点',
          'icon': null,
          'children': [] })
      for (let i = 0; i < res.length; i++) {
        data.push({
          'key': 'key-01-' + res[i].diagnosisId,
          'title': res[i].diagnosisName,
          'icon': 'solution',
          'id': res[i].diagnosisId,
          'group': true
        })
      }
      data1[0].children = data
      this.orgTree = data1
      console.log(data1)
    })
    },
    methods: {
        handleClick (e) {
          this.treekey = e.key.substring(7)
            console.log('Diagnosis_handleClick', e.key.substring(7))
            this.$emit('test', e.key.substring(7))
            // 先执行完父组件的方法再执行下面的语句
            console.log('test结束')
        }
    }
}
</script>
