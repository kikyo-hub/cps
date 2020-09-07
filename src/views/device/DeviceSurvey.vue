<template>
  <a-card :loading="loading" :bordered="false">
    <div class="salesCard">
      <a-tabs
        default-active-key="1"
        size="large"
        :tab-bar-style="{marginBottom: '24px', paddingLeft: '16px'}"
      >
        <a-tab-pane tab="温湿度" key="1">
        </a-tab-pane>
        <a-tab-pane tab="二氧化碳浓度" key="2">
        </a-tab-pane>
        <a-tab-pane tab="光照监测" key="3">
        </a-tab-pane>
        <a-tab-pane tab="红外感应" key="4">
        </a-tab-pane>
      </a-tabs>
    </div>
  </a-card>
</template>

<script>

const data = [
  {
    name: 'Ant Design Title 1'
  },
  {
    name: 'Ant Design Title 2'
  },
  {
    name: 'Ant Design Title 3'
  },
  {
    name: 'Ant Design Title 4'
  }
]

const columns = [
  {
    dataIndex: 'name',
    key: 'name',
     title: '设备名称',
    slots: { title: 'customTitle' },
    scopedSlots: { customRender: 'name' }
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age'
  },
  {
    title: '地址',
    dataIndex: 'address',
    key: 'address'
  },
  {
    title: '设备状态',
    key: 'tags',
    dataIndex: 'tags',
    scopedSlots: { customRender: 'tags' }
  },
  {
    title: '操作',
    key: 'action',
    scopedSlots: { customRender: 'action' }
  }
]

const tabledata = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer']
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser']
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher']
  }
]

export default {
  name: 'Coltroller',
  components: {
  },
  data () {
    return {
      data,
      tabledata,
      columns,
      visible: false,
      pStyle: {
        fontSize: '16px',
        color: 'rgba(0,0,0,0.85)',
        lineHeight: '24px',
        display: 'block',
        marginBottom: '16px'
      },
      pStyle2: {
        marginBottom: '24px'
      }
    }
  },
  methods: {
    showDrawer () {
      this.visible = true
    },
    onClose () {
      this.visible = false
    }
  }
}
</script>
