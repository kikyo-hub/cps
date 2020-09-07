<template>
  <!-- <a-modal title="设备信息" :width="640" :visible="visible" @ok="handleSubmit" @cancel="onCancel"> -->
  <a-form :form="form" style="width: 100%">
    <a-form-item label="字典编号" :labelCol="labelCol" :wrapperCol="wrapperCol" style="display:none;">
      <a-input v-decorator="['key', {initialValue: '',rules:[{required: false, message: '字典编号'}]}]" />
    </a-form-item>

    <a-form-item label="字典名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
      <a-input v-decorator="['title', {initialValue: '',rules:[{required: true, message: '字典名称'}]}]" />
    </a-form-item>

    <a-form-item label="分类标识" :labelCol="labelCol" :wrapperCol="wrapperCol">
      <a-input v-decorator="['code_type', {initialValue: '',rules:[{required: true, message: '分类标识'}]}]" />
    </a-form-item>

    <a-form-item label="维护类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
      <a-input v-decorator="['type_code', {initialValue: '',rules:[{required: false, message: '维护类型'}]}]" />
    </a-form-item>

    <a-form-item label="维护单位" :labelCol="labelCol" :wrapperCol="wrapperCol" style="display: none;">
      <a-select
        placeholder="请选择 维护单位"
        v-decorator="['org_no', {rules:[{required: false, message: '需选择 维护单位'}],initialValue: 0}]"
        style="width: 240px"
      >
        <a-select-option
          v-for="it in [{key:0,value:'合肥'}, {key:1,value:'蚌埠'}]"
          :key="it.key"
          :value="it.key"
        >{{ it.value }}</a-select-option>
      </a-select>
    </a-form-item>

    <a-form-item label="代码版本" :labelCol="labelCol" :wrapperCol="wrapperCol">
      <a-input v-decorator="['vn', {initialValue: '',rules:[{required: false, message: '代码版本'}]}]" />
    </a-form-item>

    <a-form-item label="是否有效" :labelCol="labelCol" :wrapperCol="wrapperCol">
      <a-select
        placeholder="请选择 有效值"
        v-decorator="['valid_flag', {initialValue: 1,rules:[{required: false, message: '需选择 有效值'}]}]"
        style="width: 100%;"
      >
        <a-select-option
          v-for="it in [{value:0,name:'无效'}, {value:1,name:'有效'}]"
          :key="it.value"
          :value="it.value"
        >{{ it.name }}</a-select-option>
      </a-select>
    </a-form-item>

    <a-form-item label="生效日期" :labelCol="labelCol" :wrapperCol="wrapperCol">
      <a-date-picker
        format="YYYY-MM-DD HH:mm:ss"
        v-decorator="['effect_date', {initialValue: moment(getCurrentData(), 'YYYY-MM-DD'),rules:[{required: false, message: '生效日期'}]}]"
        style="width: 100%;"></a-date-picker>
    </a-form-item>

    <a-form-item label="level" :labelCol="labelCol" :wrapperCol="wrapperCol" style="display: none;">
      <a-input v-decorator="['level', {rules:[{required: false, message: 'level'}]}]" />
    </a-form-item>

    <a-form-item :wrapper-col="{ span: 12, offset: 12 }">
      <a-button type="primary" html-type="submit" @click="submitForm"> 提 交 </a-button>
    </a-form-item>

  </a-form>
  <!-- </a-modal> -->
</template>

<script>
import moment from 'moment'
import locale from 'ant-design-vue/es/date-picker/locale/zh_CN'
import { UpdateDicts } from '@/api/system/dict'
export default {
  // name: 'MonitorEquipFormInsert',
  props: {
      dictItem: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      locale,
      visible: true,
      form: this.$form.createForm(this),
      labelCol: { xs: { span: 24 }, sm: { span: 7 } },
      wrapperCol: { xs: { span: 24 }, sm: { span: 13 } },
      orgs: [{ key: '', val: '', display: '' }]
    }
  },
  created () {
    // console.log(' 接受父类的参数 ', this.dictItem)
    this.initForm(this.dictItem)
  },
  methods: {
    initForm (dictItem) {
      this.dictItem = dictItem
      this.form.setFieldsValue({
          'key': dictItem.key,
          'title': dictItem.title,
          'type_code': dictItem.type_code,
          'org_no': dictItem.org_no,
          'valid_flag': dictItem.valid_flag,
          'vn': dictItem.vn,
          'code_type': dictItem.code_type,
          'effect_date': dictItem.effect_date,
          'level': dictItem.level
      })
    },
    submitForm () {
      this.form.validateFields((e, vs) => {
          if (vs.effect_date != null && vs.effect_date !== '') vs.effect_date = vs.effect_date.format('yyyy-MM-DD hh:mm:ss ')
          // console.log('表单值vs ：', vs, ',\n ')
          this.updateDicts(vs)
      })
    },
    moment,
    range (start, end) {
        const result = []
        for (let i = start; i < end; i++) {
            result.push(i)
        }
        return result
    },
    disabledDate (current) {
        return current && current < moment().endOf('day')
    },

    disabledDateTime () {
        return {
            disabledHours: () => this.range(0, 24).splice(4, 20),
            disabledMinutes: () => this.range(30, 60),
            disabledSeconds: () => [55, 56]
        }
    },
    getCurrentData () {
      return new Date().toLocaleDateString()
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
      }
  }
}
</script>
<style>
  .ant-form-item-children {
    width: 100%;
  }

</style>
