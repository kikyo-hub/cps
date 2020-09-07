<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">

          <a-col :md="8" :sm="24">
            <a-form-item label=" 用 户 登 录 名 ">
              <a-input placeholder=" 用 户 登 录 名 " v-model="queryParam.loginName"/>
            </a-form-item>
          </a-col>

          <a-col :md="8" :sm="24">
            <a-form-item label=" 用 户 姓 名 ">
              <a-input placeholder=" 用 户 姓 名 " v-model="queryParam.userName"/>
            </a-form-item>
          </a-col>

          <a-col :md="8" :sm="24" style="display: none">
            <a-form-item label=" 用 户 电 话 ">
              <a-input placeholder=" 用 户 电 话 " v-model="queryParam.phone"/>
            </a-form-item>
          </a-col>

          <a-col :md="8" :sm="24" style="display: none">
            <a-form-item label=" 用 户 公 司 ">
              <a-input placeholder=" 用 户 公 司 " v-model="queryParam.orgId"/>
            </a-form-item>
          </a-col>

          <a-col :md="8" :sm="24">
            <a-button type="primary" @click="loadUserDatas">查询</a-button>
            <a-button style="margin-left: 8px" @click="restForm">重置</a-button>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <div class="table-operator">
      <a-button type="primary" icon="plus" style="margin:5px" @click="createRecord"> 新 建 </a-button>
      <a-popconfirm title="确定删除吗？" ok-text="Yes" cancel-text="No" @confirm="batchremoveRecord" @cancel="e=>this.$message.error('Click on No')">
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
              <a-col :span="4" > <strong style="color: #03a9f4;"> 角 色 列 表 : </strong> </a-col>
              <a-col :span="20">
                <a-button v-for="(it,index ) in text.roles" :key="index" style="margin:15px 16px 0px 0px;background-color: #66CCFF;">{{ it.name }}</a-button>
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
        <a-form-item label=" 用 户 ID " :labelCol="labelCol" :wrapperCol="wrapperCol" style="display:none">
          <a-input placeholder=" 用 户 ID " v-model="usersRecord.id"/>
        </a-form-item>

        <a-form-item label=" 登 录 名  " :labelCol="labelCol" :wrapperCol="wrapperCol" >
          <a-input placeholder=" 登 录 名 " v-model="usersRecord.loginName"/>
        </a-form-item>

        <a-form-item label=" 用 户 密 码 " :labelCol="labelCol" :wrapperCol="wrapperCol" >
          <a-input placeholder=" 用 户 密 码 " v-model="usersRecord.loginPasswd"/>
        </a-form-item>

        <!-- <a-form-item label=" 用 户 姓 名 " :labelCol="labelCol" :wrapperCol="wrapperCol" >
          <a-input placeholder=" 用 户 姓 名 " v-model="usersRecord.userName"/>
        </a-form-item>-->

        <!-- <a-form-item label=" 联 系 电 话 " :labelCol="labelCol" :wrapperCol="wrapperCol" >
          <a-input placeholder=" 联 系 电 话 " v-model="usersRecord.phone"/>
        </a-form-item>-->

        <!-- <a-form-item label=" 用 户 状 态 " :labelCol="labelCol" :wrapperCol="wrapperCol" >
          <a-input placeholder=" 用 户 状 态 " v-model="usersRecord.status"/>
        </a-form-item>-->

        <!-- <a-form-item label=" 用 户 组 织 " :labelCol="labelCol" :wrapperCol="wrapperCol" >
          <a-input placeholder=" 用 户 组 织 " v-model="usersRecord.orgId"/>
        </a-form-item>-->

        <a-form-item label=" 分 配 角 色 " :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-select v-model="selectRoles" mode="multiple" style="width: 100%" placeholder="select one country" option-label-prop="label" >
            <a-select-option v-for="(role, index) in userRoles" :key="index" :value="role.id" :label="role.name" >
              {{ role.name }} --  {{ role.code }}
            </a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
  </a-card>
</template>

<script>
    import { asyncRouterMap } from '@/config/router.config'
    import { getUsers, updateUsers, delUsers, getRoles } from '@/api/system/users'
    const columns = [
        { title: ' 用 户 ID', dataIndex: 'id' },
        { title: ' 登 录 名', dataIndex: 'loginName', sorter: true },
        { title: ' 用 户 姓 名 ', dataIndex: 'userName', sorter: true },
        { title: ' 联 系 电 话', dataIndex: 'phone', sorter: true },
        { title: ' 状 态 ', dataIndex: 'status', sorter: true },
        { title: ' 所 属 组 织 ', dataIndex: 'orgId', sorter: true },
        { title: ' 操 作', dataIndex: 'action', scopedSlots: { customRender: 'action' } }
    ]
    export default {
        components: {

        },
        data () {
            return {
                //  模态框 相关参数
                visible: false,
                modalTitle: ' 新 建 用 户 ',
                labelCol: { xs: { span: 24 }, sm: { span: 7 } },
                wrapperCol: { xs: { span: 24 }, sm: { span: 13 } },
                usersRecord: { id: null, loginName: null, loginPasswd: null, userName: null, phone: null, status: null, orgId: null, roles: [], auths: [] },
                // 筛选表单相关参数
                queryParam: { id: null, loginName: null, loginPasswd: null, userName: null, phone: null, status: null, orgId: null, roles: [], auths: [] },
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
                userAuths: [],
                expandedRowKeys: [],
                auths: [],
                userRoles: [],
                selectRoles: []
            }
        },
        created () {
            this.loadUserDatas()
            this.authList()
            this.getRoleList()
        },
        methods: {
            onPageChange (page, pageSize) {
                this.pagination.current = page
                this.pagination.pageSize = pageSize
                this.loadUserDatas()
            },
            onSizeChange (current, pageSize) {
                this.pagination.current = current
                this.pagination.pageSize = pageSize
                this.loadUserDatas()
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
                // this.roleusers(record.id)
            },
            loadUserDatas () {
                const pageNo = this.pagination.current
                const pageSize = this.pagination.pageSize
                getUsers(Object.assign({ pageNo, pageSize }, this.queryParam)).then(resp => {
                    // console.log('000000: ', resp.result)
                    this.pagination.current = resp.result.pageNo
                    this.pagination.pageSize = resp.result.pageSize
                    this.pagination.total = resp.result.totalCount
                    // this.showTotal(resp.result.totalCount)
                    this.loadData = resp.result.data
                    this.selectedRows = []
                    this.selectedRowKeys = []
                    this.selectRoles = []
                }, e => {
                    console.log(e)
                    this.$message.error('  请 求 失 败  ！')
                })
            },
            restForm () {
                this.queryParam = { id: null, name: null, genTime: null, code: null, auths: [] }
            },
            editOrgDatas (record) {
                updateUsers(record).then(resp => {
                    // console.log('------', resp.result)
                    // if (parseInt(resp.result) > 0) {
                        this.usersRecord = { id: null, loginName: null, loginPasswd: null, userName: null, phone: null, status: null, orgId: null, roles: [], auths: [] }
                        this.$message.success(' 更 新 成 功 ！')
                    // } else {
                    //     this.$message.error(' 更 新 失 败 ！')
                    // }
                    this.loadUserDatas()
                }, e => {
                    console.log(e)
                    this.$message.error('  请 求 失 败  ！')
                })
            },
            deleOrgDatas (ids) {
                delUsers(ids).then(resp => {
                    // if (parseInt(resp.result) > 0) {
                        this.$message.success(' 更 新 成 功 ！')
                    // } else {
                    //     this.$message.error(' 更 新 失 败 ！')
                    // }
                    this.loadUserDatas()
                }, e => {
                    console.log(e)
                    this.$message.error('  请 求 失 败  ！')
                })
            },
            getRoleList () {
                getRoles().then(resp => {
                    this.userRoles = resp.result
                    // console.log('----huoqu---', resp.result)
                }, e => {
                    console.log(e)
                    this.$message.error('  请 求 失 败  ！')
                })
            },
            createRecord () {
                this.visible = true
                this.selectRoles = []
                this.modalTitle = ' 新 建  用 户 '
            },
            editRecord (index, record) {
                this.selectRoles = []
                this.visible = true
                this.modalTitle = ' 修 改 用 户 '
                this.usersRecord = record

                if (record.roles !== undefined && record.roles !== null && record.roles.length > 0) {
                    this.selectRoles = record.roles.map(it => {
                        return it.id
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
                if (this.selectRoles !== undefined && this.selectRoles !== null && this.selectRoles.length > 0) {
                    this.usersRecord.roles = []
                    this.selectRoles.forEach(it => {
                        this.usersRecord.roles.push({ 'id': it, 'name': null })
                    })
                }
                // console.log('--------或我去-----', this.usersRecord)
                this.editOrgDatas(this.usersRecord)
                // this.confirmLoading = true
                this.visible = false
            },
            modalCancel (e) {
                this.usersRecord = { id: null, loginName: null, loginPasswd: null, userName: null, phone: null, status: null, orgId: null, roles: [], auths: [] }
                this.loadUserDatas()
                this.visible = false
            },
            authList () {
                this.auths = asyncRouterMap[0].children.map(it => {
                    return { 'code': it.name, 'name': it.meta.title }
                })
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
