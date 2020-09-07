<template>
  <div style="width: 100%">
    <a-table :columns="columns" :data-source="tableDates" :pagination="{pageSize:5}"/>
    <a-form :form="form" style="width: 100%">
      <a-form-item label="字典编号" :labelCol="labelCol" :wrapperCol="wrapperCol" style="display:none;">
        <a-input v-decorator="['key', {initialValue: '',rules:[{required: false, message: '字典编号'}]}]" />
      </a-form-item>

      <a-form-item label="字典名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-input v-decorator="['title', {initialValue: '',rules:[{required: true, message: '字典名称'}]}]" />
      </a-form-item>

      <a-form-item label="字典类Id" :labelCol="labelCol" :wrapperCol="wrapperCol" style="display: none">
        <a-input v-decorator="['sort_id', {initialValue: '',rules:[{required: true, message: '字典类Id'}]}]" />
      </a-form-item>

      <a-form-item label="分类标识" :labelCol="labelCol" :wrapperCol="wrapperCol" style="width: 100%">
        <!-- <a-input v-decorator="['code_type', {rules:[{required: true, message: '分类标识'}],initialValue: ''}]" />-->
        <a-select
          placeholder="请选择 分类标识"
          v-decorator="['code_type', {rules:[{required: true, message: '需选择 分类标识'}]}]"
          style="width: 100%;"
        >
          <a-select-option
            v-for="it in treeData"
            :key="it.key"
            :value="it.code_type"
          >{{ it.title }}  : {{ it.code_type }} </a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item label="代码值" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-input v-decorator="['value', {initialValue: '', rules:[{required: true, message: '代码值'}]}]" />
      </a-form-item>

      <a-form-item label="维护单位" :labelCol="labelCol" :wrapperCol="wrapperCol" style="display: none;">
        <a-select
          placeholder="请选择 维护单位"
          v-decorator="['org_no', {initialValue: 0,rules:[{required: false, message: '需选择 维护单位'}]}]"
          style="width:100%;">
          <a-select-option
            v-for="it in [{key:0,value:'合肥'}, {key:1,value:'蚌埠'}]"
            :key="it.key"
            :value="it.key"
          >{{ it.value }} :{{ it.value }} :{{ it.value }}</a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item label="排序序号" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-input v-decorator="['disp_sn', {initialValue: '',rules:[{required: false, message: '排序序号'}]}]" />
      </a-form-item>

      <a-form-item label="字典描述" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-textarea v-decorator="['content1', {initialValue: '',rules:[{required: false, message: '字典描述'}]}]" :rows="4" />
      </a-form-item>

      <a-form-item label="level" :labelCol="labelCol" :wrapperCol="wrapperCol" style="display: none;">
        <a-input v-decorator="['level', {rules:[{required: false, message: 'level'}]}]" />
      </a-form-item>

      <a-form-item :wrapper-col="{ span: 12, offset: 12 }">
        <a-button type="primary" html-type="submit" @click="submitForm"> 提 交 </a-button>
      </a-form-item>

    </a-form>
    <!--<a-table :columns="columns" :data-source="tableDates" :pagination="{pageSize:5}"/>-->
  </div>
</template>

<script>
import { UpdateDicts } from '@/api/system/dict'
const columns = [
    {
        title: 'code_type',
        dataIndex: 'code_type',
        sorter: (a, b) => a.code_type.length - b.code_type.length
    },
    {
        title: 'title',
        dataIndex: 'title',
        sorter: (a, b) => a.title.length - b.title.length
    },
    {
        title: 'value',
        dataIndex: 'value',
        defaultSortOrder: 'descend',
        sorter: (a, b) => b.value - a.value
    },
    {
        title: 'disp_sn',
        dataIndex: 'disp_sn',
        sorter: (a, b) => parseInt(a.disp_sn) - parseInt(b.disp_sn)

    }
]
export default {
  // name: 'MonitorEquipFormInsert',
  props: {
    dictItem: {
      type: Object,
      default: null
    },
    treeData: {
        type: Array,
        default: null
    }
  },
  data () {
    return {
      visible: true,
      tableDates: [],
      columns,
      form: this.$form.createForm(this),
      labelCol: { xs: { span: 24 }, sm: { span: 7 } },
      wrapperCol: { xs: { span: 24 }, sm: { span: 13 } },
      orgs: [{ key: '', val: '', display: '' }]
    }
  },
    mounted () {
    // console.log(' 接受父类的参数 ', this.dictItem)
    this.initForm(this.dictItem)
  },
  methods: {
    tableDate (dictItem) {
       const datas = this.treeData.filter(item => {
          return dictItem.code_type === item.code_type
        })
        this.tableDates = datas[0].children
        // eslint-disable-next-line no-undef
        // console.log('=============', this.tableDates)
    },
    initForm (dictItem) {
      this.dictItem = dictItem
      this.form.setFieldsValue({
          'key': dictItem.key,
          'title': dictItem.title,
          'value': dictItem.value,
          'type_code': dictItem.type_code,
          'org_no': dictItem.org_no,
          'disp_sn': dictItem.disp_sn,
          'content1': dictItem.content1,
          'sort_id': dictItem.sort_id,
          'p_code': dictItem.p_code,
          'level': dictItem.level,
          'code_type': dictItem.code_type
      })
    },
    submitForm () {
      this.form.validateFields((e, vs) => {
          // console.log('表单值vs ：', vs, ',\n ')
          this.updateDicts(vs)
      })
    },
    updateDicts (dict) {
        UpdateDicts(dict).then(resp => {
            if (resp.result === 'success') {
                this.$emit('selectDicts')
                this.$message.success(' 更 新 成 功 ！')
            } else {
                this.$message.error(' 更 新 失 败 ！')
            }
        })
    }
  },
  watch: {
      dictItem (newVal, oldVal) {
            // console.log('新值= ', newVal)
        this.initForm(newVal)
        this.tableDate(newVal)
    }
  }
}
</script>
<style>
  .ant-form-item-children {
    width: 100%;
  }
  .ant-table-thead > tr > th, .ant-table-tbody > tr > td {
    padding: 8px 8px;
    overflow-wrap: break-word;
  }
</style>
