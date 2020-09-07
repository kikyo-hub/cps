<template>
  <a-card :bordered="true">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-item label="诊断点编号">
              <a-input v-model="queryParam.diagnosisId" placeholder="请输入"/>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="诊断点类型">
              <a-select
                :labelInValue="true"
                placeholder="请选择"
                v-model="queryParamO.diagnosisType"
                :default-value="diagnosisTypeOptions[0].key"
                @change="handleDiagnosisTypeChange">
                <a-select-option v-for="item in diagnosisTypeOptions" :key="item.key" :value="item.value">
                  {{ item.display }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <span class="table-page-search-submitButtons">
              <a-button @click="$refs.table.refresh(true)" type="primary" icon="search">查询</a-button>
              <router-link :to="{ name: 'diagnostic_point_detail' }">
                <a-button type="primary" style="margin-left: 8px" icon="plus">新增</a-button>
              </router-link>
              <!-- <a-button type="primary" style="margin-left: 8px" @click="$refs.diagnosticpoint.add()" icon="plus">老新增</a-button> -->
              <a-button style="margin-left: 8px" @click="reset" icon="reload">重置</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <!-- @expand="zhankai" -->
    <s-table
      row-key="diagnosisId"
      key="diagnosisId"
      ref="table"
      size="default"
      :columns="columns"
      :data="loadData"
    >
      <div
        slot="expandedRowRender"
        slot-scope="record"
        style="margin: 0">
        <a-row :gutter="24" :style="{ marginBottom: '4px' }">
          <a-col :span="2">用电：</a-col>
          <a-col :span="10">
            <router-link :to="{ name: 'monitor_point' }">
              <a-tag :style="{ marginBottom: '2px' }" color="#2db7f5" v-for="(role, index) in record.electro" :key="index" ><a>{{ role.MONITOR_NAME }}</a></a-tag>
            </router-link>
          </a-col>
          <a-col :span="2">环境：</a-col>
          <a-col :span="10">
            <router-link :to="{ name: 'monitor_point' }">
              <a-tag :style="{ marginBottom: '2px' }" color="#87d068" v-for="(role, index) in record.environment" :key="index" ><a>{{ role.MONITOR_NAME }}</a></a-tag>
            </router-link>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="2">空调：</a-col>
          <a-col :span="10">
            <router-link :to="{ name: 'monitor_point' }">
              <a-tag :style="{ marginBottom: '2px' }" color="#108ee9" v-for="(role, index) in record.air" :key="index" ><a>{{ role.MONITOR_NAME }}</a></a-tag>
            </router-link>
          </a-col>
        </a-row>
      </div>
      <!-- <span slot="diagnosisIdTitle"><a-icon type="switcher" /> 诊断点编号</span> -->
      <span slot="creatorTitle"><a-icon type="team" /> 创建人员</span>
      <span slot="actionTitle"><a-icon type="tool" /> 操作</span>
      <span slot="diagnosisNameTitle"><a-icon type="bars" /> 诊断点名称</span>
      <span slot="diagnosisRuleListTitle"><a-icon type="star" /> 诊断规则</span>
      <span slot="diagnosisTypeDescTitle"><a-icon type="cluster" /> 诊断点类型</span>
      <span slot="diagnosisRuleList" slot-scope="text, record">
        <router-link :to="{ name: 'diagnostic_rules' }">
          <a-tag color="purple" v-for="(role, index) in record.diagnosisRuleList" :key="index">{{ role.display }}</a-tag>
        </router-link>
      </span>
      <span slot="diagnosisType" slot-scope="text, record">
        <a-tag v-if="record.diagnosisType === '1'" color="green">{{ record.diagnosisTypeDesc }}</a-tag>
        <a-tag v-if="record.diagnosisType === '2'" color="red">{{ record.diagnosisTypeDesc }}</a-tag>
        <a-tag v-if="record.diagnosisType === '3'" color="orange">{{ record.diagnosisTypeDesc }}</a-tag>
        <a-tag v-if="record.diagnosisType === '4'" color="cyan">{{ record.diagnosisTypeDesc }}</a-tag>
        <a-tag v-if="record.diagnosisType === '5'" color="blue">{{ record.diagnosisTypeDesc }}</a-tag>
        <a-tag v-if="record.diagnosisType === '6'" color="purple">{{ record.diagnosisTypeDesc }}</a-tag>
        <!-- <a-tag v-else color="purple">{{ record.diagnosisTypeDesc }}</a-tag> -->
      </span>
      <span slot="action" slot-scope="text, record">
        <router-link :to="{ name: 'diagnostic_point_detail', params:{record: record} }">
          <a>编辑</a>
        </router-link>
        <!-- <a @click="$refs.diagnosticpoint.update(record)"> 老编辑</a> -->
        <a-divider type="vertical" />
        <a-dropdown>
          <a class="ant-dropdown-link">
            更多 <a-icon type="down" />
          </a>
          <a-menu slot="overlay">
            <a-menu-item>
              <a @click="binding(record.diagnosisId)">绑定监测点</a>
            </a-menu-item>
            <a-menu-item>
              <a @click="unbind(record.diagnosisId)">解绑监测点</a>
            </a-menu-item>
            <a-menu-item>
              <a @click="del(record.diagnosisId)">删除</a>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </span>
    </s-table>
    <DiagnosticPointForm ref="diagnosticpoint" @ok="handleOk"/>
  </a-card>
</template>

<script>
import { STable } from '@/components'
import DiagnosticPointForm from './modules/DiagnosticPointForm'
import { GetDigP, DelDigP, GetDiagnosisType } from '@/api/archives/DiagnosticPoint'
import DiagnosticPointBindingForm from './modules/DiagnosticPointBindingForm'
import DiagnosticPointUnbindForm from './modules/DiagnosticPointUnbindForm'

export default {
  name: 'TableList',
  components: {
    STable,
    DiagnosticPointForm,
    DiagnosticPointBindingForm,
    DiagnosticPointUnbindForm
  },
  data () {
    return {
      expandedRowRenderData: [],
      expandedRowKeys: [],
      visible: false,
      form: null,
      mdl: {},
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {
        rowSelectId: '',
        diagnosisId: '',
        diagnosisType: ''
      },
      diagnosisTypeOptions: [
        { key: '', val: '', display: '' }
      ],
      queryParamO: {},
      // 表头
      columns: [
        // {
        //   // title: '诊断点编号',
        //   dataIndex: 'diagnosisId',
        //   slots: { title: 'diagnosisIdTitle' },
        //   sorter: true
        // },
        {
          // title: '诊断点名称',
          slots: { title: 'diagnosisNameTitle' },
          dataIndex: 'diagnosisName'
        },
        {
          // title: '诊断规则',
          slots: { title: 'diagnosisRuleListTitle' },
          scopedSlots: { customRender: 'diagnosisRuleList' },
          dataIndex: 'diagnosisRuleList'
        },
        {
          // title: '诊断点类型',
          slots: { title: 'diagnosisTypeDescTitle' },
          scopedSlots: { customRender: 'diagnosisType' },
          dataIndex: 'diagnosisTypeDesc'
        },
        {
          // title: '创建人员',
          slots: { title: 'creatorTitle' },
          dataIndex: 'creator'
        },
        {
          // title: '操作',
          slots: { title: 'actionTitle' },
          width: '150px',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        return GetDigP(Object.assign(this.queryParam, parameter)).then(res => {
          // console.log(JSON.stringify(res, null, 4))
          this.testData = res
          return res.result
        })
      },
      testData: [],
      selectedRowKeys: [],
      selectedRows: [],
      // custom table alert & rowSelection
      options: {
        alert: { show: true, clear: () => { this.selectedRowKeys = [] } },
        rowSelection: {
          selectedRowKeys: this.selectedRowKeys,
          onChange: this.onSelectChange
        }
      },
      optionAlertShow: false
    }
  },
  mounted: function () {
    this.getDiagnosisType()
  },
  methods: {
    getDiagnosisType () {
      GetDiagnosisType().then(res => {
        this.diagnosisTypeOptions = res.result.selectable
      })
    },
    handleDiagnosisTypeChange () {
      this.queryParam.diagnosisType = this.queryParamO.diagnosisType.key
    },
    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    binding (record) {
      this.bindingVisible = true
      this.$dialog(DiagnosticPointBindingForm,
      {
        record
      },
      {
        title: '操作',
        width: 'auto',
        centered: true,
        maskClosable: false
      })
    },
    unbind (record) {
      this.$dialog(DiagnosticPointUnbindForm,
      {
        record
      },
      {
        title: '操作',
        width: 'auto',
        centered: true,
        maskClosable: false
      })
    },
    del (record) {
      DelDigP(record).then(response => {
        if (response.code === 100) {
          this.$message.warning('删除失败了')
        } else {
          this.$message.success('删除成功')
          this.$refs.table.refresh()
        }
      })
    },
    reset () {
      this.queryParam.diagnosisId = ''
      this.queryParam.diagnosisType = ''
      this.queryParamO = {}
    },
    handleOk () {
      this.$refs.table.refresh(true)
    },
    onChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    bindingHandleCancel (record) { this.bindingVisible = false },
    unbindHandleCancel (record) { this.unbindVisible = false }
  },
  watch: {
    /*
      'selectedRows': function (selectedRows) {
        this.needTotalList = this.needTotalList.map(item => {
          return {
            ...item,
            total: selectedRows.reduce( (sum, val) => {
              return sum + val[item.dataIndex]
            }, 0)
          }
        })
      }
      */
  }
}
</script>
