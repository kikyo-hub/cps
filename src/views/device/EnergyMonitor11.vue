<template>
  <a-card :loading="loading" :bordered="false">
    <div class="salesCard">
      <a-tabs
        default-active-key="1"
        size="large"
        :tab-bar-style="{marginBottom: '24px', paddingLeft: '16px'}"
      >
        <a-tab-pane tab="电能设备" key="1">
          <a-row>
            <div class="extra-item">
              <a-table :columns="columns" :data-source="tabledata">
                <a slot="name" slot-scope="text">{{ text }}</a>
                <span slot="customTitle"><a-icon type="smile-o" /> Name</span>
                <span slot="tags" slot-scope="tags">
                  <a-tag
                    v-for="tag in tags"
                    :key="tag"
                    :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'"
                  >
                    {{ tag.toUpperCase() }}
                  </a-tag>
                </span>
                <span slot="action" slot-scope="text, record">
                  <a >Invite 一 {{ record.name }}</a>
                  <a-divider type="vertical" />
                  <a slot="actions" @click="showDrawer">点我</a>
                  <a-divider type="vertical" />
                  <a class="ant-dropdown-link"> More actions <a-icon type="down" /> </a>
                </span>
              </a-table>
              <a-drawer
                title="Basic Drawer"
                placement="right"
                :closable="false"
                :visible="visible"
                :get-container="false"
                :wrap-style="{ position: 'absolute' }"
                @close="onClose"
              >
                <a-descriptions title="User Info">
                  <a-descriptions-item label="UserName">
                    Zhou Maomao
                  </a-descriptions-item>
                  <a-descriptions-item label="Telephone">
                    1810000000
                  </a-descriptions-item>
                  <a-descriptions-item label="Live">
                    Hangzhou, Zhejiang
                  </a-descriptions-item>
                  <a-descriptions-item label="Remark">
                    empty
                  </a-descriptions-item>
                  <a-descriptions-item label="Address">
                    No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
                  </a-descriptions-item>
                </a-descriptions>
              </a-drawer>
            </div>
          </a-row>
        </a-tab-pane>
        <a-tab-pane tab="水能设备" key="2">
          <a-row>
            <div>
              <a-list
                :data-source="data"
                bordered
              >
                <a-list-item slot="renderItem" :key="`a-${item.id}`" slot-scope="item">
                  <a slot="actions" @click="showDrawer">点我</a>
                  <a-list-item-meta description="Progresser XTech">
                    <a slot="title" href="https://www.antdv.com/">{{ item.name }}</a>
                    <a-avatar
                      slot="avatar"
                      src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png"
                    />
                  </a-list-item-meta>
                </a-list-item>
              </a-list>
              <a-drawer
                title="Basic Drawer"
                placement="right"
                :closable="false"
                :visible="visible"
                :get-container="false"
                :wrap-style="{ position: 'absolute' }"
                @close="onClose"
              >
                <a-descriptions>
                </a-descriptions>
              </a-drawer>
            </div>
          </a-row>
        </a-tab-pane>
        <a-tab-pane tab="燃气设备" key="3">
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
    title: '类型',
    dataIndex: 'type',
    key: 'type'
  },
  {
    title: '位置',
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
    type: '能源路由器',
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer']
  },
  {
    key: '2',
    name: 'Jim Green',
     type: '能源控制器',
    address: 'London No. 1 Lake Park',
    tags: ['loser']
  },
  {
    key: '3',
    name: 'Joe Black',
     type: '电表',
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher']
  },
  {
    key: '4',
    name: 'Joe Black',
     type: '电表',
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
