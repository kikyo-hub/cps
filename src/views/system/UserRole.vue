<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">

          <a-col :md="8" :sm="24">
            <a-form-item label=" 角 色 名 称 ">
              <a-input placeholder=" 角 色 名 称 " v-model="queryParam.name"/>
            </a-form-item>
          </a-col>

          <a-col :md="8" :sm="24">
            <a-form-item label=" 角 色 代 码 ">
              <a-input placeholder=" 角 色 代 码 " v-model="queryParam.code"/>
            </a-form-item>
          </a-col>

          <a-col :md="8" :sm="24">
            <a-button type="primary" @click="loadRoleDatas">查询</a-button>
            <a-button style="margin-left: 8px" @click="restForm">重置</a-button>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <div class="table-operator">
      <a-button type="primary" icon="plus" style="margin:5px" @click="createRecord"> 新 建 </a-button>
      <a-popconfirm
        title="确定删除吗？"
        ok-text="Yes"
        cancel-text="No"
        @confirm="batchremoveRecord"
        @cancel="e=>this.$message.error('Click on No')"
        style="display: none">
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
      <p slot="expandedRowRender" slot-scope="text" style="margin: 0">
        <a-row>
          <a-col :span="12" >
            <a-row>
              <a-col :span="4" > <strong style="color: #03a9f4;">用 户 列 表 : </strong> </a-col>
              <a-col :span="20">
                <a-table :columns="roleUserColumns" :data-source="roleUserList" :pagination="roleUserPagination" :row-key="row=>row.USER_ID"> </a-table>
              </a-col>
            </a-row>
          </a-col>
          <a-col :span="12">
            <a-row>
              <a-col :span="4">  <strong style="color: #03a9f4;">权 限 列 表 : </strong></a-col>
              <a-col :span="20">
                <a-button v-for="(it,index ) in text.auths" :key="index" style="margin:15px 16px 0px 0px;background-color: #87e8de;">{{ auths.filter(i=>it.code===i.code)[0].name }}</a-button>
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
        <a-form-item label=" 角 色 ID " :labelCol="labelCol" :wrapperCol="wrapperCol" style="display:none">
          <a-input placeholder=" 角 色 ID " v-model="roleRecord.id"/>
        </a-form-item>

        <a-form-item label=" 角 色 名 称 " :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input placeholder=" 角 色 名 称 " v-model="roleRecord.name" :maxLength="10"/>
        </a-form-item>

        <a-form-item label=" 角 色 代 码 " :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input placeholder=" 角 色 代 码 " v-model="roleRecord.code"/>
        </a-form-item>

        <a-form-item label=" 创 建 时 间 " :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-date-picker format="YYYY-MM-DD HH:mm:ss" style="width: 100%;" v-model="roleRecord.genTime"></a-date-picker>
        </a-form-item>

        <a-form-item label=" 分 配 权 限 " :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-select v-model="roleAuths" mode="multiple" style="width: 100%" placeholder="select one country" option-label-prop="label" >
            <a-select-option v-for="(auth, index) in auths" :key="index" :value="auth.code" :label="auth.name" >
              {{ auth.name }}
            </a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
  </a-card>
</template>

<script>
    import { asyncRouterMap } from '@/config/router.config'
    import { getRoles, updateRole, deleteRoles, getRoleUsers } from '@/api/system/role'
    const columns = [
        { title: ' 角 色 ID', dataIndex: 'id' },
        { title: ' 角 色 名 称', dataIndex: 'name', sorter: true },
        { title: ' 创 建 时 间 ', dataIndex: 'genTime', sorter: true },
        { title: ' 角 色 代 码', dataIndex: 'code', sorter: true },
        { title: ' 操 作', dataIndex: 'action', scopedSlots: { customRender: 'action' } }
    ]
    const roleUserColumns = [
        { title: ' 用 户 ID', dataIndex: 'USER_ID' },
        { title: ' 用 户 登 录 名', dataIndex: 'login_name', sorter: true },
        { title: ' 用 户 姓 名 ', dataIndex: 'user_name', sorter: true },
        { title: ' 用 户 状态 ', dataIndex: 'user_status', sorter: true }
    ]
    export default {
        components: {

        },
        data () {
            return {
                orgTypes: [ ],
                //  模态框 相关参数
                visible: false,
                modalTitle: ' 新 建 角 色',
                labelCol: { xs: { span: 24 }, sm: { span: 7 } },
                wrapperCol: { xs: { span: 24 }, sm: { span: 13 } },
                roleRecord: { id: null, name: null, genTime: null, code: null, auths: [] },
                // 筛选表单相关参数
                queryParam: { id: null, name: null, genTime: null, code: null, auths: [] },
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
                roleAuths: [],
                expandedRowKeys: [],
                auths: [],
                roleUserList: [],
                roleUserColumns,
                roleUserPagination: { pageSize: 5 }
            }
        },
        created () {
            this.loadRoleDatas()
            this.authList()
        },
        methods: {
            onPageChange (page, pageSize) {
                this.pagination.current = page
                this.pagination.pageSize = pageSize
                this.loadRoleDatas()
            },
            onSizeChange (current, pageSize) {
                this.pagination.current = current
                this.pagination.pageSize = pageSize
                this.loadRoleDatas()
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
                this.roleusers(record.id)
            },
            loadRoleDatas () {
                const pageNo = this.pagination.current
                const pageSize = this.pagination.pageSize
                getRoles(Object.assign({ pageNo, pageSize }, this.queryParam)).then(resp => {
                    // console.log('000000: ', resp.result)
                    this.pagination.current = resp.result.pageNo
                    this.pagination.pageSize = resp.result.pageSize
                    this.pagination.total = resp.result.totalCount
                    // this.showTotal(resp.result.totalCount)
                    this.loadData = resp.result.data
                    this.roleAuths = []
                    this.selectedRows = []
                    this.selectedRowKeys = []
                }, e => {
                    console.log(e)
                    this.$message.error('  请 求 失 败  ！')
                })
            },
            restForm () {
                this.queryParam = { id: null, name: null, genTime: null, code: null, auths: [] }
            },
            editOrgDatas (record) {
                updateRole(record).then(resp => {
                    // console.log('------', resp.result)
                    // if (parseInt(resp.result) > 0) {
                        this.roleRecord = { id: null, name: null, genTime: null, code: null, auths: [] }
                        this.$message.success(' 更 新 成 功 ！')
                    // } else {
                    //     this.$message.error(' 更 新 失 败 ！')
                    // }
                    this.loadRoleDatas()
                }, e => {
                    console.log(e)
                    this.$message.error('  请 求 失 败  ！')
                })
            },
            deleOrgDatas (ids) {
                deleteRoles(ids).then(resp => {
                    // if (parseInt(resp.result) > 0) {
                        this.$message.success(' 更 新 成 功 ！')
                    // } else {
                    //     this.$message.error(' 更 新 失 败 ！')
                    // }
                    this.loadRoleDatas()
                }, e => {
                    console.log(e)
                    this.$message.error('  请 求 失 败  ！')
                })
            },
            roleusers (id) {
                getRoleUsers(id).then(resp => {
                    this.roleUserList = resp.result
                }, e => {
                    console.log(e)
                    this.$message.error('  请 求 失 败  ！')
                })
            },
            createRecord () {
                this.visible = true
                this.modalTitle = ' 新 建 角 色 '
            },
            editRecord (index, record) {
                this.roleAuths = []
                this.visible = true
                this.modalTitle = ' 修 改 角 色 '
                this.roleRecord = record

                if (record.auths !== undefined && record.auths !== null && record.auths.length > 0) {
                    this.roleAuths = record.auths.map(it => {
                        return it.code
                    })
                }
                // console.log('====修 改 角 色====', record)
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
            modalOk (e) {
                if (this.roleAuths !== undefined && this.roleAuths !== null && this.roleAuths.length > 0) {
                    this.roleRecord.auths = []
                    this.roleAuths.forEach(it => {
                        this.roleRecord.auths.push({ 'code': it, 'name': null })
                    })
                }
                // console.log('--------或我去-----', this.roleRecord)
                this.editOrgDatas(this.roleRecord)
                this.visible = false
            },
            modalCancel (e) {
                // console.log('=========', e)
                this.roleRecord = { id: null, name: null, genTime: null, code: null, auths: [] }
                this.loadRoleDatas()
                this.visible = false
            },
            authList () {
                this.auths = asyncRouterMap[0].children.map(it => {
                    return { 'code': it.name, 'name': it.meta.title }
                })
                // console.log('-----权限列表---------', this.auths)
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
