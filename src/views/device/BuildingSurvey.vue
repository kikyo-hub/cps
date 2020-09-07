<template>
  <a-card :bordered="false">
    <a-row :gutter="8">
      <a-col :span="4">
        <s-tree
          :dataSource="orgTree"
          :openKeys.sync="openKeys"
          :search="false"
          row-key="i"
          @click="handleClick"
          @add="handleAdd"
          @titleClick="handleTitleClick"
          style="min-height:666px;max-height:666px;overflowY:scroll;background-color:Azure"></s-tree>
      </a-col>
      <template v-if="see">
        <a-col :span="20">
          <div id="buse">
            <a-button
              shape="round"
              v-for="(i, index) in button"
              :key="index"
              :class="{clickBg:clickIndex==index}"
              @click="enterIconLoading(index);attain(i.key)">
              {{ i.buttonoption }}
            </a-button>
            <a-card>
              <a-form layout="inline">
                <a-row :gutter="48">
                  <a-col :md="6" :sm="12">
                    <a-form-item label="设备类型">
                      <a-select placeholder="请选择" default-value="0" style="width:150px">
                        <a-select-option value="0">全部</a-select-option>
                        <a-select-option value="1">空调</a-select-option>
                        <a-select-option value="2">照明</a-select-option>
                        <a-select-option value="3">给水</a-select-option>
                        <a-select-option value="4">燃气</a-select-option>
                        <a-select-option value="5">温湿度</a-select-option>
                      </a-select>
                    </a-form-item>
                  </a-col>
                  <a-col :md="6" :sm="12">
                    <a-form-item label="运行状态">
                      <a-select placeholder="请选择" default-value="0" style="width:150px">
                        <a-select-option value="0">全部</a-select-option>
                        <a-select-option value="1">关闭</a-select-option>
                        <a-select-option value="2">运行中</a-select-option>
                      </a-select>
                    </a-form-item>
                  </a-col>
                  <a-col :md="6" :sm="12">
                    <a-form-item label="设备状态">
                      <a-select placeholder="请选择" default-value="0" style="width:150px">
                        <a-select-option value="0">全部</a-select-option>
                        <a-select-option value="1">开</a-select-option>
                        <a-select-option value="2">关</a-select-option>
                      </a-select>
                    </a-form-item>
                  </a-col>
                  <template v-if="advanced">
                    <a-col :md="6" :sm="12">
                      <a-form-item label="设备名称">
                        <a-input placeholder=""/>
                      </a-form-item>
                    </a-col>
                    <a-col :md="6" :sm="12">
                      <a-form-item label="使用状态">
                        <a-select placeholder="请选择" default-value="0" style="width:150px">
                          <a-select-option value="0">全部</a-select-option>
                          <a-select-option value="1">关闭</a-select-option>
                          <a-select-option value="2">运行中</a-select-option>
                        </a-select>
                      </a-form-item>
                    </a-col>
                    <a-col :md="6" :sm="12">
                      <a-form-item label="设备类型">
                        <a-select placeholder="请选择" default-value="0" style="width:150px">
                          <a-select-option value="0">全部</a-select-option>
                          <a-select-option value="1">关闭</a-select-option>
                          <a-select-option value="2">运行中</a-select-option>
                        </a-select>
                      </a-form-item>
                    </a-col>
                  </template>
                  <a-col :md="!advanced && 6 || 24" :sm="24">
                    <span class="table-page-search-submitButtons" :style="advanced && { float: 'right', overflow: 'hidden' } || {} ">
                      <a-button type="primary" style="margin-left: 30px" @click="$refs.table.refresh(true)" icon="search">查询</a-button>
                      <a-button type="primary" style="margin-left:15px; height:30px" @click="insertData" icon="plus">新增</a-button>
                      <!-- <a-button type="dashed" style="margin-left: 15px" @click="() => queryParam = {}" icon="reload">重置</a-button> -->
                      <a @click="toggleAdvanced" style="margin-left: 8px">
                        {{ advanced ? '收起' : '展开' }}
                        <a-icon :type="advanced ? 'up' : 'down'"/>
                      </a>
                    </span>
                  </a-col>
                </a-row>
                <a-table
                  :columns="colheads"
                  :data-source="tabledata"
                  row-key="monotorId">
                  <a slot="name" slot-scope="text">{{ text }}</a>
                  <span slot="customTitle"><a-icon type="smile-o" /> Name</span>
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
                        <a-menu-item><a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.energyEquipId)">
                          <a>删除</a>
                        </a-popconfirm></a-menu-item>
                      </a-menu>
                      <a>更多<a-icon type="down"/></a>
                    </a-dropdown>
                  </span>
                </a-table>
              </a-form>
            </a-card>
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
        </a-col>
      </template>
      <template v-else>
        <a-col :span="20">
          <div id="buse">
            <a-button
              shape="round"
              v-for="(i, index) in button1"
              :key="index"
              :class="{clickBg:clickIndex==index}"
              @click="enterIconLoading(index);attain(i.key)">
              {{ i.buttonoption }}
            </a-button>
            <a-card>
              <a-form layout="inline">
                <a-row :gutter="48">
                  <a-col :md="6" :sm="12">
                    <a-form-item label="设备类型">
                      <a-select placeholder="请选择" default-value="0" style="width:150px">
                        <a-select-option value="0">全部</a-select-option>
                        <a-select-option value="1">空调</a-select-option>
                        <a-select-option value="2">照明</a-select-option>
                        <a-select-option value="3">给水</a-select-option>
                        <a-select-option value="4">燃气</a-select-option>
                        <a-select-option value="5">温湿度</a-select-option>
                      </a-select>
                    </a-form-item>
                  </a-col>
                  <a-col :md="6" :sm="12">
                    <a-form-item label="运行状态">
                      <a-select placeholder="请选择" default-value="0" style="width:150px">
                        <a-select-option value="0">全部</a-select-option>
                        <a-select-option value="1">关闭</a-select-option>
                        <a-select-option value="2">运行中</a-select-option>
                      </a-select>
                    </a-form-item>
                  </a-col>
                  <a-col :md="6" :sm="12">
                    <a-form-item label="设备状态">
                      <a-select placeholder="请选择" default-value="0" style="width:150px">
                        <a-select-option value="0">全部</a-select-option>
                        <a-select-option value="1">开</a-select-option>
                        <a-select-option value="2">关</a-select-option>
                      </a-select>
                    </a-form-item>
                  </a-col>
                  <template v-if="advanced">
                    <a-col :md="6" :sm="12">
                      <a-form-item label="设备名称">
                        <a-input placeholder=""/>
                      </a-form-item>
                    </a-col>
                    <a-col :md="6" :sm="12">
                      <a-form-item label="使用状态">
                        <a-select placeholder="请选择" default-value="0" style="width:150px">
                          <a-select-option value="0">全部</a-select-option>
                          <a-select-option value="1">关闭</a-select-option>
                          <a-select-option value="2">运行中</a-select-option>
                        </a-select>
                      </a-form-item>
                    </a-col>
                    <a-col :md="6" :sm="12">
                      <a-form-item label="设备类型">
                        <a-select placeholder="请选择" default-value="0" style="width:150px">
                          <a-select-option value="0">全部</a-select-option>
                          <a-select-option value="1">关闭</a-select-option>
                          <a-select-option value="2">运行中</a-select-option>
                        </a-select>
                      </a-form-item>
                    </a-col>
                  </template>
                  <a-col :md="!advanced && 6 || 24" :sm="24">
                    <span class="table-page-search-submitButtons" :style="advanced && { float: 'right', overflow: 'hidden' } || {} ">
                      <a-button type="primary" style="margin-left: 30px" @click="$refs.table.refresh(true)" icon="search">查询</a-button>
                      <a-button type="primary" style="margin-left:15px; height:30px" @click="insertData" icon="plus">新增</a-button>
                      <!-- <a-button type="dashed" style="margin-left: 15px" @click="() => queryParam = {}" icon="reload">重置</a-button> -->
                      <a @click="toggleAdvanced" style="margin-left: 8px">
                        {{ advanced ? '收起' : '展开' }}
                        <a-icon :type="advanced ? 'up' : 'down'"/>
                      </a>
                    </span>
                  </a-col>
                </a-row>
                <a-table
                  :columns="colheads"
                  :data-source="tabledata"
                  row-key="monotorId">
                  <a slot="name" slot-scope="text">{{ text }}</a>
                  <span slot="customTitle"><a-icon type="smile-o" /> Name</span>
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
              </a-form>
            </a-card>
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
        </a-col>
      </template>
    </a-row>

    <BuildingSurveyForm ref="modal" @ok="handleSaveOk" @close="handleSaveClose" />
  </a-card>
</template>

<script>
import moment from 'moment'
import STree from '@/components/Tree/Tree'
import { STable } from '@/components'
import BuildingSurveyForm from './modules/BuildingSurveyForm'
// import { getOrgTree } from '@/api/device/buildingsurvey'
import { GetTabledata, DeleteEng } from '@/api/device/energysurvey'
import { GetAllBuiData } from '@/api/archives/building'
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
var tabledata = []
export default {
  name: 'TreeList',
  components: {
    BuildingSurveyPlot,
    STable,
    STree,
    BuildingSurveyForm
  },
  data () {
    return {
      colheads,
      tabledata,
      openKeys: ['key-01'],
      // 查询参数
      // queryParam: {},
      // 加载数据方法 必须为 Promise 对象
      orgTree: [],
      advanced: false,
      visible: false,
      equipStatus: false,
      button: [
        { buttonoption: '空调', key: 1 },
        { buttonoption: '照明', key: 2 },
        { buttonoption: '用电', key: 3 }],
        button1: [
        { buttonoption: '空调', key: 1 },
        { buttonoption: '照明', key: 2 },
        { buttonoption: '用电', key: 3 },
        { buttonoption: '给水', key: 4 },
        { buttonoption: '燃气', key: 5 },
        { buttonoption: '供热', key: 6 },
        { buttonoption: '环境', key: 7 }],
      clickIndex: 0, // 默认选中第一个button
      see: true
      // selectedRowKeys: [],
      // selectedRows: []
    }
  },
  created () {
      // 获取全部的楼栋信息
      var uzi = ''
      GetAllBuiData(uzi).then(res => {
        this.allbuildingdata = res.result
        console.log('全部楼栋信息:', this.allbuildingdata)
        this.treekey = this.allbuildingdata[0].buildingNo
        console.log('treekey:', this.treekey)
        const data1 = []
        const data = []
        data1.push({ 'key': 'key-01',
            'title': '平台组织机构',
            'icon': 'hdd',
            'children': [] })
        for (let i = 0; i < this.allbuildingdata.length; i++) {
          data.push({
            'key': 'key-01-' + this.allbuildingdata[i].buildingNo,
            'title': this.allbuildingdata[i].buildingName,
            'icon': 'read',
            'id': this.allbuildingdata[i].buildingNo,
            'group': true
          })
        }
        data1[0].children = data
        this.orgTree = data1
      })
  },
  mounted () {
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
        this.tabledata = response.result
        // console.log('数据', this.tabledata)
        for (let i = 0; i < this.tabledata.length; i += 1) {
          if (this.tabledata[i].switchStatus === 1) {
            this.tabledata[i].status = '可用'
          } else {
                   this.tabledata[i].status = '停运'
          }
        }
      })
    },
    handleClick (e) {
      console.log('handleClick', e)
      if (e.key === 'key-01-100000001') {
        this.see = true
        this.clickIndex = 0
        GetTabledata(1).then(response => {
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
      } else {
        this.see = false
        this.clickIndex = 0
        GetTabledata(1).then(response => {
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
    },
    handleAdd (item) {
      // console.log('add button, item', item)
      // this.$message.info(`提示：你点了  ${item.title} `)
      this.$refs.modal.add(item.title, item.address)
      // qhx:this.$refs.modal指向orgtree组件
    },
    handleTitleClick (item) {
      console.log('handleTitleClick', item)
    },
    titleClick (e) {
      console.log('titleClick', e)
    },
    handleSaveOk () {

    },
    handleSaveClose () {

    },

    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },

    handleEdit (record) {
      // console.log('record', record)
       this.$dialog(EnergySurveyForm,
        // component props
        {
          record
        },
        // console.log('bbbb', record),
        // modal props
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
    handleDelete (key) {
      console.log('删除键值', key)
         DeleteEng(key).then(response => {
        this.$message.info('删除成功!')
        console.log(JSON.stringify(response))
      })
      this.reload()
    },
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    onChange (checked) {
      console.log(`a-switch to ${checked}`)
    },
    resetSearchForm () {
      this.queryParam = {
        date: moment(new Date())
      }
    },
    enterIconLoading (index) {
      this.clickIndex = index
      console.log(this.clickIndex)
    },
    attain (item) {
      console.log('标签页', item)
      var callbackdnNo = ''
      switch (item) {
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
        callbackdnNo = 11
         break
        case 5:
       callbackdnNo = 21
        break
        case 6:
       callbackdnNo = 31
        break
        case 7:
       callbackdnNo = 4
        break
      }
      GetTabledata(callbackdnNo).then(response => {
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
