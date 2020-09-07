<template>
  <div class="energytable">
    <div class="table-page-search-wrapper">
      <template>
        <a-tabs type="card" @change="callback">
          <a-tab-pane v-for="(item) of taboption" :key="item.key" :tab="item.label">
            <a-button
              type="primary"
              shape="round"
              v-for="(i, index) in item.button"
              :key="index"
              class="button"
              :class="{'clickBg':index==clickIndex}"
              @click="enterIconLoading(index);attain(i.index)">
              {{ i.buttonoption }}
            </a-button>
            <a-table
              :columns="colheads"
              :data-source="tabledata"
              row-key="monotorId"
              style="margin-top: 10px">
              <a slot="name" slot-scope="text">{{ text }}</a>
              <span slot="status" slot-scope="status">
                <a-tag :color="status ==='停运' ? 'red' : 'green'" >
                  {{ status.toUpperCase() }}
                </a-tag>
              </span>
              <span slot="equipStatus" slot-scope="text, record">
                <div v-if="record.equipStatus === 1">
                  <a-switch checked-children="开" un-checked-children="关" default-checked />
                </div>
                <div v-else>
                  <a-switch checked-children="开" un-checked-children="关" />
                </div>
              </span>
              <span slot="action" slot-scope="text, record">
                <a @click="showDrawer()"><a-icon type="smile" theme="twoTone" two-tone-color="#52c41a" />实时数据曲线</a>
                <a-divider type="vertical" />
                <a-dropdown>
                  <a-menu slot="overlay">
                    <a-menu-item><a @click="handleEdit(record)">编辑</a></a-menu-item>
                    <a-menu-item><a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.monotorId)">
                      <a>删除</a>
                    </a-popconfirm></a-menu-item>
                  </a-menu>
                  <a>更多<a-icon type="down"/></a>
                </a-dropdown>
              </span>
            </a-table>
          </a-tab-pane>
        </a-tabs>
      </template>
      <a-drawer
        title="一楼监测详情"
        placement="right"
        width="1664"
        :closable="true"
        :visible="visible"
        :after-visible-change="afterVisibleChange"
        @close="onClose"
      >
        <p>
          <BuildingSurveyPlot />
        </p>
      </a-drawer>

    </div>
    <create-form ref="createModal" @ok="handleOk" />
    <step-by-step-modal ref="modal" @ok="handleOk"/>
  </div>
</template>

<script>
import moment from 'moment'
import { STable, Ellipsis } from '@/components'
import StepByStepModal from './modules/StepByStepModal'
import CreateForm from './modules/CreateForm'
// import { getRoleList, getServiceList } from '@/api/user/manage'
import { GetTabledata, DeleteEng } from '@/api/device/energysurvey'
import EnergySurveyForm from './modules/EnergySurveyForm'
import EnergySurveyInsert from './modules/EnergySurveyInsert'
import BuildingSurveyPlot from './BuildingSurveyPlot'

const colheads = [
    {
      dataIndex: 'equipName',
      key: 'equipName',
       title: '设备名称',
      slots: { title: 'equipTitle' },
      scopedSlots: { customRender: 'equipName' },
      align: 'center'
    },
    {
      title: '类型',
      dataIndex: 'typeName',
      key: 'typeName',
      align: 'center'
    },
    {
      title: '位置',
      dataIndex: 'floorNO',
      key: 'floorNO',
      align: 'center'
    },
    {
      title: '设备状态',
      key: 'status',
      dataIndex: 'status',
      scopedSlots: { customRender: 'status' },
      align: 'center'
    },
    {
      title: '设备地址',
      key: 'equipAddress',
      dataIndex: 'equipAddress',
      scopedSlots: { customRender: 'equipAddress' },
      align: 'center'
    },
    {
      title: '运行状态',
      key: 'equipStatus',
      dataIndex: 'equipStatus',
      scopedSlots: { customRender: 'equipStatus' },
      align: 'center'
    },
    {
      title: '操作',
      key: 'action',
      scopedSlots: { customRender: 'action' },
      align: 'center'
    }
  ]
const tabledata = []

export default {
  inject: ['reload'],
  name: 'TableList',
  components: {
    STable,
    Ellipsis,
    CreateForm,
    StepByStepModal,
    BuildingSurveyPlot
  },
  data () {
    return {
      colheads,
      tabledata,
      visible: false,
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {},
      selectedRowKeys: [],
      selectedRows: [],
      options: {
        alert: { show: false, clear: () => { this.selectedRowKeys = [] } },
        rowSelection: {
          selectedRowKeys: this.selectedRowKeys,
          onChange: this.onSelectChange
        }
      },
      optionAlertShow: false,
      taboption: [
        {
          label: '电监测',
        button: [{ buttonoption: '空调', index: 1 }, { buttonoption: '照明', index: 2 }, { buttonoption: '用电', index: 3 }],
          key: 1
        },
        {
          label: '水监测',
          button: [{ buttonoption: '给水', index: 4 }],
          key: 2
        },
        {
          label: '气监测',
          button: [{ buttonoption: '燃气', index: 5 }],
          key: 3
        },
        {
          label: '热监测',
          button: [{ buttonoption: '供热', index: 6 }],
          key: 4
        },
        {
          label: '温湿度监测',
          button: [{ buttonoption: '环境', index: 7 }, { buttonoption: '湿度', index: 14 }],
          key: 5
        },
        {
          label: '红外监测',
          button: [{ buttonoption: '红外监测', index: 15 }],
          key: 6
        },
        {
          label: 'CO2监测',
          button: [{ buttonoption: 'CO2监测', index: 16 }],
          key: 7
        }
      ],
      clickIndex: 0,
      equipStatus: false
    }
  },

  created () {
    this.tableOption()
    // getRoleList({ t: new Date() })
  },

  mounted: function () {
  this.getdata()
},

  methods: {
     // plot所需函数
    afterVisibleChange (val) {
      console.log('visible', val)
    },
    showDrawer () {
      this.visible = true
    },
    onClose () {
      this.visible = false
    },
    getdata () {
      GetTabledata(1).then(response => {
        // console.log('sfsdfsdf', JSON.stringify(response, null, 2))
        this.tabledata = response.result
        console.log('sfsdfsdf', this.tabledata)
        for (let i = 0; i < this.tabledata.length; i += 1) {
          if (this.tabledata[i].switchStatus === 1) {
            this.tabledata[i].status = '可用'
          } else {
                   this.tabledata[i].status = '停运'
          }
        }
      })
    },
    tableOption () {
      if (!this.optionAlertShow) {
        this.options = {
          alert: { show: true, clear: () => { this.selectedRowKeys = [] } },
          rowSelection: {
            selectedRowKeys: this.selectedRowKeys,
            onChange: this.onSelectChange,
            getCheckboxProps: record => ({
              props: {
                disabled: record.no === 'No 2', // Column configuration not to be checked
                name: record.no
              }
            })
          }
        }
        this.optionAlertShow = true
      } else {
        this.options = {
          alert: false,
          rowSelection: null
        }
        this.optionAlertShow = false
      }
    },
    handleEdit (record) {
       this.$dialog(EnergySurveyForm,
        {
          record
        },
        {
          title: '操作',
          width: 700,
          centered: true,
          maskClosable: false
        })
    },
    insertData () {
      this.$dialog(EnergySurveyInsert,
      {},
      {
        title: '操作',
        width: 700,
        centered: true,
        maskClosable: false
      })
    },
    handleOk () {
      this.$refs.table.refresh()
    },
    handleDelete (key) {
      console.log('删除键值', key)
         DeleteEng(key).then(response => {
        this.$message.info('删除成功!')
        console.log(JSON.stringify(response))
      })
      this.reload()
    },

    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    resetSearchForm () {
      this.queryParam = {
        date: moment(new Date())
      }
    },
    onChange (checked) {
      console.log(`a-switch to ${checked}`)
    },
    // 点击tabs触发函数
    callback (key) {
      this.clickIndex = 0
      console.log('标签页', key)
      var callbackdnNo = ''
      switch (key) {
        case 1:
        callbackdnNo = 1
         break
        case 2:
        callbackdnNo = 2
         break
        case 3:
        callbackdnNo = 3
         break
        case 4:
        callbackdnNo = 4
         break
        case 5:
       callbackdnNo = 5
        break
      }
      GetTabledata(callbackdnNo).then(response => {
        // console.log('sfsdfsdf', JSON.stringify(response, null, 2))
        console.log('clickIndex', this.clickIndex)
        this.tabledata = response.result
        console.log('数据', this.tabledata)
        for (let i = 0; i < this.tabledata.length; i += 1) {
          if (this.tabledata[i].switchStatus === 1) {
            this.tabledata[i].status = '可用'
          } else {
                  this.tabledata[i].status = '停运'
          }
        }
      })
    },
    enterIconLoading (param) {
      this.clickIndex = param
      console.log(param)
    },
    attain (item) {
       GetTabledata(item).then(response => {
        // console.log('sfsdfsdf', JSON.stringify(response, null, 2))
        console.log('clickIndex', this.clickIndex)
        this.tabledata = response.result
        console.log('数据', this.tabledata)
        for (let i = 0; i < this.tabledata.length; i += 1) {
          if (this.tabledata[i].switchStatus === 1) {
            this.tabledata[i].status = '可用'
          } else {
                  this.tabledata[i].status = '停运'
          }
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .hoverBg{
   background: #ccc;
   color: #fff;
 }
 .clickBg{
  //  background: red;
  background:linear-gradient(90deg, #03a9f4, #f441a5, #ffeb3b, #03a9f4);
  color: #fff;
  background-size: 400%;
 }
 .clickBg:hover::before {
  animation: sun 8s infinite;
}

.clickBg:hover {
  animation: sun 8s infinite;
}

@keyframes sun {
  100% {
    background-position: -400% 0;
  }
}
</style>
