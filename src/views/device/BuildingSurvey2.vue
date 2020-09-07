<template>
  <a-card :loading="loading" :bordered="false">
    <div class="salesCard">
      <a-row>
        <a-col span="8">
          <a-list item-layout="vertical" size="large" :pagination="pagination" :data-source="listData">
            <a-list-item slot="renderItem" key="item.title" slot-scope="item">
              <template v-for="{ type, text } in actions" slot="actions">
                <span :key="type">
                  <a-icon :type="type" style="margin-right: 8px" />
                  {{ text }}
                </span>
              </template>
              <a-list-item-meta :description="item.description">
                <a slot="title" @click="void(0)">{{ item.title }}</a>
                <a-avatar slot="avatar" :src="getImg(item.title)" />
              </a-list-item-meta>
            </a-list-item>
          </a-list>
        </a-col>
        <a-col span="16">
          <div class="salesCard">
            <a-tabs
              default-active-key="1"
              size="large"
              :tab-bar-style="{marginBottom: '24px', paddingLeft: '16px'}"
            >
              <a-tab-pane tab="照明" key="1">
                <a-row>
                  <div class="extra-item" >
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
                      <span slot="action" >
                        <a class="ant-dropdown-link"> More actions <a-icon type="down" /> </a>
                      </span>
                    </a-table>
                  </div>
                </a-row>
              </a-tab-pane>
              <a-tab-pane tab="插座" key="2">
              </a-tab-pane>
              <a-tab-pane tab="给水" key="3">
              </a-tab-pane>
              <a-tab-pane tab="空调" key="4">
              </a-tab-pane>
            </a-tabs>
          </div>
        </a-col>
      </a-row>
    </div>
  </a-card>
</template>

<script>
const buildimg = require('@/assets/build.svg')
const houseimg = require('@/assets/house.svg')
const listData = []
for (let i = 0; i < 8; i++) {
  listData.push({
    // href: 'void(0)',
    title: `楼栋号 ${i}`,
    avatar: buildimg,
    description: '可以放一些统计信息'
  })
}

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
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher']
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher']
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher']
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher']
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher']
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher']
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher']
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher']
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher']
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
  name: 'Router',
    data () {
        return {
        listData,
        columns,
        tabledata,
        pagination: {
            onChange: page => {
                console.log(page)
            },
            pageSize: 5
        },
        actions: [
            { type: 'star-o', text: '156' },
            { type: 'like-o', text: '156' },
            { type: 'message', text: '2' }
        ]
        }
    },
  getImg (type) {
      if (type === 0) {
        return buildimg
      } else {
       return houseimg
      }
    }
}
</script>

<style>
.demo-infinite-container {
  border: 1px solid #e8e8e8;
  border-radius: 4px;
  overflow: auto;
  padding: 8px 24px;
  height: 300px;
}
.demo-loading-container {
  position: absolute;
  bottom: 40px;
  width: 100%;
  text-align: center;
}
</style>
