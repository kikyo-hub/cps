<template>
  <a-card :bordered="false">
    <a-row :gutter="8">
      <a-col :span="4">
        <a-card title="支持的数据报表" style="width: 100%;height:100%;" :bordered="false">
          <!-- <a-input-search style="margin-bottom: 8px" placeholder="Search" @change="onChange" /> -->
          <Tree
            :tree-data="reports"
            @search="true"
            show-icon
            style="margin-left:-15%;margin-top:-10%">
            <a-icon slot="smile" type="lock" theme="twoTone"/>
            <a-icon slot="config" type="profile" theme="twoTone" />
            <a-icon slot="real" type="trademark-circle" theme="twoTone" />
            <a-icon slot="daydata" type="reconciliation" theme="twoTone" />
            <a-icon slot="cavuel" type="up-square" theme="twoTone" />
          </Tree>
        </a-card></a-col>
      <a-col :span="20">
        <div class="salesCard">
          <a-tabs
            default-active-key="1"
            size="large"
            :tab-bar-style="{marginBottom: '24px', paddingLeft: '16px'}"
          >
            <a-tab-pane v-for="item in items" :key="item.key" :tab="item.name">
              <div v-html="test"></div>
              <a-table
                :columns="columns"
                :data-source="data"
                bordered
                size="middle"
              >
                <template slot="title">
                  <p style="text-align:center;font-size:20px;font-weight:bold;margin:0px;">电能实时数据</p>
                </template>
                <template slot="footer" >
                  备注：
                </template>
              </a-table>
            </a-tab-pane>
          </a-tabs>
        </div>
      </a-col>
    </a-row>
  </a-card>
</template>

<script>

import { Tree } from 'ant-design-vue'

const items = [
  {
  key: '1',
  name: '电能',
  icon: 'bars'
  },
  {
    key: '2',
    name: '水能',
    icon: 'appstore'
  },
  {
    key: '3',
    name: '气能',
    icon: 'appstore'
  },
  {
    key: '4',
    name: '热能',
    icon: 'appstore'
  },
  {
    key: '5',
    name: '综合',
    icon: 'bars'
  }
 ]

const columns = [
  {
   title: '监测点',
  dataIndex: 'Other',
   align: 'center',
  key: 'Other',
  customRender: (value, row, index) => {
          const obj = {
            children: value,
            attrs: {}
          }
          if (index % 5 === 0) {
            obj.attrs.rowSpan = 5
            // console.log(value, row, index)
          } else {
            obj.attrs.rowSpan = 0
          }
          // These two are merged into above cell
          // if (index === 3) {
          //   obj.attrs.rowSpan = 0
          // }
          // if (index === 4) {
          //   obj.attrs.colSpan = 0
          // }
          return obj
        }
  },
  {
   title: '时间',
  dataIndex: 'Other1',
   align: 'center',
  key: 'Other1'
  },
  {
   title: '表计信息',
   children: [
     { title: '通信地址',

   align: 'center',
     dataIndex: 'Cposition',
     customRender: (value, row, index) => {
          const obj = {
            children: value,
            attrs: {}
          }
          if (index % 5 === 0) {
            obj.attrs.rowSpan = 5
            // console.log(value, row, index)
          } else {
            obj.attrs.rowSpan = 0
          }
          // These two are merged into above cell
          // if (index === 3) {
          //   obj.attrs.rowSpan = 0
          // }
          // if (index === 4) {
          //   obj.attrs.colSpan = 0
          // }
          return obj
        },
  key: 'Cposition' },
  { title: '安装位置',

   align: 'center',
   customRender: (value, row, index) => {
          const obj = {
            children: value,
            attrs: {}
          }
          if (index % 5 === 0) {
            obj.attrs.rowSpan = 5
            // console.log(value, row, index)
          } else {
            obj.attrs.rowSpan = 0
          }
          // These two are merged into above cell
          // if (index === 3) {
          //   obj.attrs.rowSpan = 0
          // }
          // if (index === 4) {
          //   obj.attrs.colSpan = 0
          // }
          return obj
        },
     dataIndex: 'position',
  key: 'position' }
   ]
  },
  {
   title: '数据',
   children: [
     { title: '抄表数据',

   align: 'center',
     dataIndex: 'Other2',
  key: 'Other2' },
  { title: '耗电量',

   align: 'center',
     dataIndex: 'Other3',
  key: 'Other3' }
   ]
  },
  {
   title: '抄表人',
   align: 'center',
  dataIndex: 'Other4',
  key: 'Other4'
  }
]

const data = []
const data1 = []
for (let i = 0; i < 5; i++) {
  data.push({
    key: i,
    Other: '监测点1',
    Other1: i * 6 + ':00',
    Other2: i * 15 + 32,
    Other3: 15,
    Other4: '抄表人'
  })
  data1.push({
    key: i + 5,
    Other: '监测点2',
    Other1: i * 6 + ':00',
    Other2: i * 17 + 32,
    Other3: 17,
    Other4: '抄表人2'
  })
}
data.push(...data1)
//  const columns = [
//    { electric: [] }
//  ]

export default {
  name: 'DataReport',
  loading: 'false',
  components: {
    Tree
  },
  data () {
    return {
      columns,
      data,
      test: null,
      reports: [
                { key: '1', title: '实时数据', slots: { icon: 'real' }, children: [] },
                { key: '2', title: '日统计报表', slots: { icon: 'daydata' }, children: [] },
                { key: '3', title: '月统计报表', slots: { icon: 'cavuel' }, children: [] }
              ],
      items
    }
  },
  // http://localhost:3999/ureport/
  mounted () {
    //  this.$http.get('/ureport/preview?_u=p').then(res => {
    //   //  res.replace(/ureport/g, '123')
    //    console.log(res)
    //    this.test = res
    //  })
  },
  methods: {
    onSelect (selectedKeys, info) {
      console.log('selected', selectedKeys, info)
    },
    onCheck (checkedKeys, info) {
      console.log('onCheck', checkedKeys, info)
    }
  }

}
</script>
