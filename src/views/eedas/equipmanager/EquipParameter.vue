<template>
  <!-- <a-modal title="设备信息" :width="640" :visible="visible" @ok="handleSubmit" @cancel="onCancel"> -->
  <a-form :form="form">
    <a-form-item label="设备编号" :labelCol="labelCol" :wrapperCol="wrapperCol" style="display:none;">
      <a-input v-decorator="['equipId', {rules:[{required: false, message: '设备编号'}]}]" />
    </a-form-item>
    <a-form-item label="设备名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
      <a-input v-decorator="['equipName', {rules:[{required: true, message: '设备名称'}]}]" />
    </a-form-item>
    <a-form-item label="通信地址" :labelCol="labelCol" :wrapperCol="wrapperCol">
      <a-input
        v-decorator="['commAddress', {rules:[{required: true, pattern: new RegExp(/^[0-9]\d*$/, 'g' ), message: '设备通信地址不正确'}]}]"
      />
    </a-form-item>
    <a-form-item label="设备类型" :labelCol="labelCol" :wrapperCol="wrapperCol" hasFeedback>
      <a-select
        placeholder="请选择 设备类型"
        v-decorator="['equipType', {rules:[{required: true, message: '需选择 设备类型'}]}]"
        style="width: 240px"
      >
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
        v-decorator="['commMode', {rules:[{required: true, message: '需选择 通信方式'}]}]"
        style="width: 240px"
      >
        <a-select-option
          v-for="item in equipCommModeOptions"
          :key="item.key"
          :value="item.value"
        >{{ item.display }}</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="规约类型" :labelCol="labelCol" :wrapperCol="wrapperCol" hasFeedback>
      <a-select
        placeholder="请选择 通信规约"
        v-decorator="['protocolType', {rules:[{required: true, message: '需选择 通信规约'}]}]"
        style="width: 240px"
      >
        <a-select-option
          v-for="item in equipProtocolOptions"
          :key="item.key"
          :value="item.value"
        >{{ item.display }}</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="上级设备" :labelCol="labelCol" :wrapperCol="wrapperCol" hasFeedback>
      <a-select
        placeholder="请选择 上级设备"
        v-decorator="['upEquipId', {rules:[{required: false, message: '需选择 通信规约'}]}]"
        style="width: 240px"
      >
        <a-select-option
          v-for="item in upEquipOptions"
          :key="item.key"
          :value="item.value"
        >{{ item.display }}</a-select-option>
      </a-select>
      <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
        <a-button type="primary" html-type="submit" @click="submitForm">提 交</a-button>
      </a-form-item>
    </a-form-item>
  </a-form>
  <!-- </a-modal> -->
</template>

<script>
import pick from 'lodash.pick'
import {
  updEquip,
  insEquip,
  GetEquipTypeO,
  GetEquipCommModeO,
  GetEquipProtocolO,
  GetUpEquipOptions,
  GetEquipModeOptions
} from '@/api/archives/MonitorEquip'

export default {
  // name: 'MonitorEquipFormInsert',
  props: {
    record: {
      type: Object,
      default: null
    },
    tree1: {
      type: Object,
      default: null
    },
    tree2: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      visible: true,
      form: this.$form.createForm(this),
      EquipRecord: {},
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 13 }
      },
      equipTypeOptions: [{ key: '', val: '', display: '' }],
      equipCommModeOptions: [{ key: '', val: '', display: '' }],
      equipProtocolOptions: [{ key: '', val: '', display: '' }],
      equipModeOptions: [{ key: '', val: '', display: '' }],
      upEquipOptions: [{ key: '', val: '', display: '' }]
    }
  },
  mounted () {
    console.log(' 接受父类的参数 ', this.record)
    this.EquipRecord = this.record
    this.getOptions()
    this.initForm()
  },
  methods: {
    initForm () {
      this.form.setFieldsValue({
        equipId: this.record.equipId,
        commAddress: this.record.commAddress,
        equipType: this.record.equipType,
        commMode: this.record.commMode,
        protocolType: this.record.protocolType,
        equipName: this.record.equipName,
        upEquipId: this.record.upEquipId
      })
    },
    submitForm () {
      this.form.validateFields((e, vs) => {
        console.log('表单值 ：', vs, ',\n tree1 = ', this.tree1, ',\n tree2 = ', this.tree2)
      })
    },
    add () {
      this.visible = true
    },
    update (record) {
      this.visible = true
      setTimeout(() => {
        if (record) {
          console.log(record)
          this.form.setFieldsValue(
            pick(record, ['equipId', 'commAddress', 'equipType', 'commMode', 'protocolType', 'equipName', 'upEquipId'])
          )
        }
      }, 100)
    },
    getOptions () {
      GetEquipTypeO().then(response => {
        this.equipTypeOptions = response.result.selectable
      })
      GetEquipCommModeO().then(response => {
        this.equipCommModeOptions = response.result.selectable
      })
      GetEquipProtocolO().then(response => {
        this.equipProtocolOptions = response.result.selectable
      })
      GetEquipModeOptions().then(response => {
        this.equipModeOptions = response.result.selectable
      })
      GetUpEquipOptions().then(response => {
        this.upEquipOptions = response.result
      })
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
        console.log(values)
        if (!errors) {
          if (!values.equipId) {
            console.log('新增')
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
            console.log('编辑')
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
