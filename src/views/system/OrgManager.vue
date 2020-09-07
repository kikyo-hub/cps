<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">

          <a-col :md="8" :sm="24">
            <a-form-item label=" 企 业 名 称 ">
              <a-input placeholder=" 企 业 名 称 " v-model="queryParam.name"/>
            </a-form-item>
          </a-col>

          <a-col :md="8" :sm="24">
            <a-form-item label=" 联 系 人 ">
              <a-input placeholder=" 联 系 人 " v-model="queryParam.contacts"/>
            </a-form-item>
          </a-col>

          <a-col :md="8" :sm="24">
            <a-form-item label=" 联 系 电 话 ">
              <a-input placeholder=" 联 系 电 话 " v-model="queryParam.tel"/>
            </a-form-item>
          </a-col>

          <a-col :md="8" :sm="24">
            <a-form-item label=" 联 系 地 址 ">
              <a-input placeholder=" 联 系 地 址 " v-model="queryParam.addr"/>
            </a-form-item>
          </a-col>

          <a-col :md="8" :sm="24">
            <a-form-item label=" 企 业 类 型 ">
              <a-select placeholder="请选择 企 业 类 型 " default-value="0" v-model="queryParam.type">
                <a-select-option v-for="it in orgTypes" :key="it.id" :value="it.value" >{{ it.name }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>

          <a-col :md="8" :sm="24">
            <a-button type="primary" @click="loadOrgData">查询</a-button>
            <a-button style="margin-left: 8px" @click="restForm">重置</a-button>
          </a-col>

        </a-row>
      </a-form>
    </div>

    <div class="table-operator">
      <a-button type="primary" icon="plus" style="margin:5px" @click="createRecord"> 新 建 </a-button>
      <a-popconfirm title="确定删除吗？" ok-text="Yes" cancel-text="No" @confirm="batchremoveRecord" @cancel="e=>this.$message.error('Click on No')" >
        <a-button type="danger" icon="delete" style="margin:5px"> 批 量 删 除 </a-button>
      </a-popconfirm>
    </div>
    <a-table
      :columns="columns"
      :data-source="loadData"
      :pagination="pagination"
      :row-selection="rowSelection"
      :row-key="row=>row.id"
      @expandedRowsChange="expandedRowsChange"
      @expand="expandRows"
      :expandedRowKeys="expandedRowKeys">
      <span slot="action" slot-scope="text, record, index">
        <a-button type="primary" size="small" @click="editRecord(index,record)" style="margin:5px"> 编 辑 </a-button>
        <a-popconfirm title="确定删除吗？" ok-text="Yes" cancel-text="No" @confirm="removeRecord(index, record)" @cancel="e=>this.$message.error('Click on No')" >
          <a-button type="danger" size="small" style="margin:5px"> 删 除 </a-button>
        </a-popconfirm>
      </span>
      <span slot="org_type" slot-scope="text">
        {{ OrgtypeName(text) }}
      </span>
      <p slot="expandedRowRender" style="margin: 0">
        <!--{{ orgUsers }}-->
        <a-row>
          <a-col :span="24" >
            <a-row>
              <a-col :span="2" > <strong style="color: #03a9f4;">用 户 列 表 : </strong> </a-col>
              <a-col :span="16">
                <a-table :columns="orgUserColumns" :data-source="orgUsers" :pagination="orgUserPagination" :row-key="row=>row.USER_ID"> </a-table>
              </a-col>
            </a-row>
          </a-col>
        </a-row>
      </p>
    </a-table>

    <a-modal
      :title="modalTitle"
      :visible="visible"
      :closable="true"
      @ok="modalOk"
      @cancel="modalCancel"
      :width="'50%'">
      <a-form style="width: 100%">
        <a-form-item label=" 企 业 ID " :labelCol="labelCol" :wrapperCol="wrapperCol" style="display:none">
          <a-input placeholder=" 企 业 ID " v-model="orgRecord.id"/>
        </a-form-item>

        <a-form-item label=" 企 业 名 称 " :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input placeholder=" 企 业 名 称 " v-model="orgRecord.name" :maxLength="10"/>
        </a-form-item>

        <a-form-item label=" 联  系  人   " :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input placeholder=" 联 系 人 " v-model="orgRecord.contacts"/>
        </a-form-item>

        <a-form-item label=" 联 系 电 话 " :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input placeholder=" 联 系 电 话 " v-model="orgRecord.tel"/>
        </a-form-item>

        <a-form-item label=" 联 系 地 址 " :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input placeholder=" 联 系 地 址 " v-model="orgRecord.addr" style="width:100%"/>
        </a-form-item>

        <a-form-item label=" 企 业 类 型 " :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-select placeholder="请选择 企 业 类 型 " default-value="01" v-model="orgRecord.type">
            <a-select-option v-for="it in orgTypes" :key="it.id" :value="it.value" >{{ it.name }}</a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
  </a-card>
</template>

<script>

import { getOrgDatas, updateOrgData, deleteOrgDatas, getOrgTypes, getOrgUsers } from '@/api/system/org'
const orgUserColumns = [
    { title: ' 用 户 ID', dataIndex: 'USER_ID' },
    { title: ' 用 户 登 录 名', dataIndex: 'login_name', sorter: true },
    { title: ' 用 户 姓 名 ', dataIndex: 'user_name', sorter: true },
    { title: ' 用 户 状态 ', dataIndex: 'user_status', sorter: true }
]
const columns = [
                { title: ' 企 业 ID', dataIndex: 'id' },
                { title: ' 企 业 名 称', dataIndex: 'name', sorter: true },
                { title: ' 联 系 地 址 ', dataIndex: 'addr', sorter: true },
                { title: ' 联 系 人', dataIndex: 'contacts', sorter: true },
                { title: ' 企 业 类 别', dataIndex: 'type', sorter: true, scopedSlots: { customRender: 'org_type' } },
                { title: ' 操 作', dataIndex: 'action', scopedSlots: { customRender: 'action' } }
            ]
export default {
    components: {

    },
    data () {
        return {
            orgTypes: [ ],
          //  模态框 相关参数
            visible: false,
            modalTitle: ' 新 建 组 织',
            labelCol: { xs: { span: 24 }, sm: { span: 7 } },
            wrapperCol: { xs: { span: 24 }, sm: { span: 13 } },
            orgRecord: { id: null, type: null, name: null, addr: null, contacts: null, tel: null },
          // 筛选表单相关参数
            queryParam: { id: null, type: null, name: null, addr: null, contacts: null, tel: null },
          // 表格相关参数
            columns,
            loadData: [],
            selectedRowKeys: [],
            selectedRows: [],
            pagination: {
              defaultCurrent: 0,
              defaultPageSize: 10,
              current: 1,
              pageSize: 10,
              total: 0,
              showTotal: (total, range) => `共 ${total} 条数据`,
              showSizeChanger: true,
              pageSizeOptions: ['5', '10', '15', '20'],
              // showQuickJumper: true,
              onShowSizeChange: (current, pageSize) => this.onSizeChange(current, pageSize),
              onChange: (page, pageSize) => this.onPageChange(page, pageSize)
            },
            rowSelection: {
              onSelect: (record, selected, selectedRows) => this.rowSelectionOnSelect(record, selected, selectedRows),
              onSelectAll: (selected, selectedRows, changeRows) => this.rowSelectionOnSelectAll(selected, selectedRows, changeRows)
            },
            orgUsers: [],
            expandedRowKeys: [],
            orgUserColumns,
            orgUserPagination: { pageSize: 5 }
        }
    },
    created () {
        this.loadOrgData()
         this.orgType()
    },
    methods: {
      loadOrgData () {
        const pageNo = this.pagination.current
        const pageSize = this.pagination.pageSize
        getOrgDatas(Object.assign({ pageNo, pageSize }, this.queryParam)).then(resp => {
          // console.log('000000: ', resp.result.data.length)
          this.pagination.current = resp.result.pageNo
          this.pagination.pageSize = resp.result.pageSize
          this.pagination.total = resp.result.totalCount
          // this.showTotal(resp.result.totalCount)
          this.loadData = resp.result.data
        }, e => {
            console.log(e)
            this.$message.error('  请 求 失 败  ！')
        })
      },
      editOrgDatas (record) {
        updateOrgData(record).then(resp => {
          // console.log('------', resp.result)
          // if (parseInt(resp.result) > 0) {
            this.orgRecord = { id: null, type: null, name: null, addr: null, contacts: null, tel: null }
            this.loadOrgData()
            this.$message.success(' 更 新 成 功 ！')
          // } else {
          //     this.$message.error(' 更 新 失 败 ！')
          // }
        }, e => {
            console.log(e)
            this.$message.error('  请 求 失 败  ！')
        })
      },
      deleOrgDatas (ids) {
        deleteOrgDatas(ids).then(resp => {
           // if (parseInt(resp.result) > 0) {
            this.selectedRows = []
            this.selectedRowKeys = []
            this.loadOrgData()
            this.$message.success(' 更 新 成 功 ！')
          // } else {
          //   this.$message.error(' 更 新 失 败 ！')
          // }
        }, e => {
            console.log(e)
            this.$message.error('  请 求 失 败  ！')
        })
      },
      orgType () {
        getOrgTypes().then(resp => {
          // console.log('===========', resp.result)
          this.orgTypes = resp.result
        }, e => {
            console.log(e)
            this.$message.error('  请 求 失 败  ！')
        })
      },
      Users (id) {
        getOrgUsers(id).then(resp => {
          this.orgUsers = resp.result
        }, e => {
            console.log(e)
            this.$message.error('  请 求 失 败  ！')
        })
      },
      restForm () {
          this.queryParam = { id: null, type: null, name: null, addr: null, contacts: null, tel: null }
      },
      onPageChange (page, pageSize) {
          this.pagination.current = page
          this.pagination.pageSize = pageSize
          this.loadOrgData()
      },
      onSizeChange (current, pageSize) {
          this.pagination.current = current
          this.pagination.pageSize = pageSize
          this.loadOrgData()
      },
      createRecord () {
          this.visible = true
          this.modalTitle = ' 新 建 组 织 '
      },
      editRecord (index, record) {
          this.visible = true
          this.modalTitle = ' 修 改 组 织 '
          this.orgRecord = record
          // console.log('========', record)
      },
      removeRecord (index, record) {
        const ids = []
        ids.push(record.id)
        this.deleOrgDatas(ids)
      },
      batchremoveRecord () {
        // console.log('批量删除')
        this.deleOrgDatas(this.selectedRowKeys)
      },
      rowSelectionOnSelect (record, selected, selectedRows) {
        this.selectedRows = selectedRows
        this.selectedRowKeys = selectedRows.map(it => { return it.id })
      },
      rowSelectionOnSelectAll (selected, selectedRows, changeRows) {
        this.selectedRows = selectedRows
        this.selectedRowKeys = selectedRows.map(it => { return it.id })
        // console.log('=====', this.selectedRowKeys)
      },
      expandedRowsChange (expandedRows) {
        if (expandedRows.legnth === 0) {
            this.expandedRowKeys = []
            return
        }
        const arr = []
        arr.push(expandedRows[expandedRows.length - 1])
        this.expandedRowKeys = arr
      },
      expandRows (expanded, record) {
          this.Users(record.id)
      },
      OrgtypeName (text) {
        const arr = this.orgTypes.filter(it => it.value === text)
        if (arr === undefined || arr === null || arr.length === 0) {
          return ''
        } else {
          return arr[0].name
        }
      },
      modalOk (e) {
        this.editOrgDatas(this.orgRecord)
        // this.confirmLoading = true
        this.visible = false
      },
      modalCancel (e) {
        this.orgRecord = { id: null, type: null, name: null, addr: null, contacts: null, tel: null }
          this.loadOrgData()
        this.visible = false
      }
    },
    watch: {
    }
}
</script>

<style lang="less" scoped>
  .search {
    margin-bottom: 54px;
  }

  .fold {
    width: calc(100% - 216px);
    display: inline-block
  }

  .operator {
    margin-bottom: 18px;
  }

  @media screen and (max-width: 900px) {
    .fold {
      width: 100%;
    }
  }
  .ant-form-item-children {
    width: 100%;
  }
</style>
