<template>
  <a-modal title="设备信息" :width="640" :visible="visible" @ok="handleSubmit" @cancel="onCancel">
    <a-form :form="form">
      <a-form-item label="设备编号" :labelCol="labelCol" :wrapperCol="wrapperCol" style="display:none;">
        <a-input v-decorator="['equipId', {rules:[{required: false, message: '设备编号'}]}]" />
      </a-form-item>
      <a-form-item label="设备名称" :labelCol="labelCol" :wrapperCol="wrapperCol" hasFeedback>
        <a-input v-decorator="['equipName', {rules:[{required: true, message: '设备名称'}]}]" />
      </a-form-item>
      <a-form-item label="通信地址" :labelCol="labelCol" :wrapperCol="wrapperCol" hasFeedback>
        <a-input
          v-decorator="['commAddress', {rules:[{required: true, pattern: new RegExp(/^[0-9]\d*$/, 'g' ), message: '设备通信地址不正确'}]}]"
        />
      </a-form-item>
      <a-form-item label="设备类型" :labelCol="labelCol" :wrapperCol="wrapperCol" hasFeedback>
        <a-select
          placeholder="请选择 设备类型"
          v-decorator="['equipType', {rules:[{required: true, message: '需选择 设备类型'}]}]" >
          <a-select-option
            v-for="item in equipTypeOptions"
            :key="item.key"
            :value="item.value"
          >{{ item.display }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="通信方式" :labelCol="labelCol" :wrapperCol="wrapperCol" hasFeedback>
        <a-select
          placeholder="请选择 通信方式"
          v-decorator="['commMode', {rules:[{required: true, message: '需选择 通信方式'}]}]" >
          <a-select-option
            v-for="item in commModeOptions"
            :key="item.key"
            :value="item.value"
          >{{ item.display }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="规约类型" :labelCol="labelCol" :wrapperCol="wrapperCol" hasFeedback>
        <a-select
          placeholder="请选择 通信规约"
          v-decorator="['protocolType', {rules:[{required: true, message: '需选择 通信规约'}]}]" >
          <a-select-option
            v-for="item in protocolTypeOptions"
            :key="item.key"
            :value="item.value"
          >{{ item.display }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="上级设备" :labelCol="labelCol" :wrapperCol="wrapperCol" hasFeedback>
        <a-select
          placeholder="请选择 上级设备"
          v-decorator="['upEquipId', {rules:[{required: false, message: '需选择 通信规约'}]}]" >
          <a-select-option
            v-for="item in upEquipOption"
            :key="item.key"
            :value="item.value"
          >{{ item.display }}</a-select-option>
        </a-select>
      </a-form-item>
      <div>
        <a-form-item label="CT" :labelCol="labelCol" :wrapperCol="wrapperCol" hasFeedback>
          <a-input v-decorator="['ct', {rules:[{required: true, pattern: new RegExp(/^\d+$|^\d+[.]?\d+$/, 'g' ), message: '请输入正确的CT'}]}]" />
        </a-form-item>
        <a-form-item label="PT" :labelCol="labelCol" :wrapperCol="wrapperCol" hasFeedback>
          <a-input v-decorator="['pt', {rules:[{required: true, pattern: new RegExp(/^\d+$|^\d+[.]?\d+$/, 'g' ), message: '请输入正确的PT'}]}]" />
        </a-form-item>
        <a-form-item label="配置序号" :labelCol="labelCol" :wrapperCol="wrapperCol" hasFeedback>
          <a-input v-decorator="['configNo', {rules:[{required: false, message: '请输入正确的序号'}]}]" />
        </a-form-item>
      </div>
    </a-form>
  </a-modal>
</template>

<script>
import pick from 'lodash.pick'
import {
  updEquip,
  insEquip
} from '@/api/archives/MonitorEquip'

export default {
  props: {
    equipTypeOptions: {
      type: Array,
      default: null
    },
    commModeOptions: {
      type: Array,
      default: null
    },
    protocolTypeOptions: {
      type: Array,
      default: null
    },
    upEquipOption: {
      type: Array,
      default: null
    }
  },
  data () {
    return {
      visible: false,
      form: this.$form.createForm(this),
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 13 }
      }
    }
  },
  mounted () {
    this.getOptions()
  },
  methods: {
    add () {
      this.visible = true
      setTimeout(() => {
        this.form.setFieldsValue({ ct: '1', pt: '1' })
      }, 100)
    },
    update (record) {
      this.visible = true
      setTimeout(() => {
        if (record) {
          this.form.setFieldsValue(
            pick(record, [
              'equipId',
              'commAddress',
              'equipType',
              'commMode',
              'protocolType',
              'equipName',
              'upEquipId',
              'ct',
              'pt',
              'configNo'
            ])
          )
        }
      }, 100)
    },
    getOptions () {
    },
    onCancel () {
      this.visible = false
      this.form.resetFields()
    },
    handleSubmit () {
      const {
        form: { validateFields }
      } = this
      validateFields((errors, values) => {
        if (!errors) {
          if (!values.equipId) {
            insEquip(values).then(res => {
              if (res.code === 0) {
                this.$message.success('新增成功')
                this.$emit('ok', true)
                this.visible = false
                this.form.resetFields()
              } else {
                this.$message.warning('新增失败')
              }
            })
          } else {
            updEquip(values).then(response => {
              if (response.code === 0) {
                this.$message.success('更新成功')
                this.$emit('ok', true)
                this.visible = false
                this.form.resetFields()
              } else {
                this.$message.warning('数据处理失败')
              }
            })
          }
        }
      })
    }
  }
}
</script>
