<template>
  <a-modal
    title="修改企业信息"
    :visible="visible"
    :centered="true"
    :destroyOnClose="true"
    :confirm-loading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <a-card :bordered="false">
      <a-form :form="form" :label-col="{ span: 7 }" :wrapper-col="{ span: 17 }">
        <a-form-item label="企业编号" v-show="false">
          <a-input
            v-decorator="['id', { rules: [{ required: true, message: '请输入企业编号!' }] }]"
            disabled/>
        </a-form-item>
        <a-form-item label="企业名称">
          <a-input
            v-decorator="['name', { rules: [{ required: true, message: '请输入企业名称!' }] }]"
          />
        </a-form-item>
        <a-form-item label="企业地址">
          <a-input
            v-decorator="['address', { rules: [{ required: true, message: '请输入企业名称!' }] }]"
          />
        </a-form-item>
        <a-form-item label="企业类型">
          <a-select
            v-decorator="[
              'enterprise_type',
              { rules: [{ required: true, message: '请输入企业类型!' }] },
            ]"
          >
            <a-select-option v-for="item in enterpriseType" :key="item.value" :value="item.value">
              {{ item.display }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="员工人数">
          <a-input-number
            :precision="0"
            :min="1"
            :max="100000"
            v-decorator="[ 'employees',{rules: [{ required: true, message: '需输入员工人数！' }]} ]"
            style="width:100%" />
        </a-form-item>
        <a-form-item label="企业面积">
          <a-input-number
            :precision="0"
            :min="1"
            :max="100000"
            v-decorator="[ 'area',{rules: [{ required: true, message: '需输入企业面积！' }]} ]"
            style="width:100%" />
        </a-form-item>
        <a-form-item label="企业简介">
          <a-textarea
            v-decorator="['profile', { rules: [{ required: true, message: '请输入企业简介!' }] }]"/>
        </a-form-item>
      </a-form>
    </a-card>
  </a-modal>
</template>

<script>
import { getEnterpriseType, UpdateEnDatas } from '@/api/archives/enterprise'

export default {
  props: {
    enterprise: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      visible: false,
      confirmLoading: false,
      enterpriseType: [],
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 13 }
      },
      form: this.$form.createForm(this)
    }
  },
  created () {
    this.getEnterprise()
  },
  mounted () {
  },
  methods: {
    getEnterprise () {
      getEnterpriseType().then(response => {
        this.enterpriseType = response.result.selectable
      })
    },
    show () {
      this.visible = true
      var record = this.enterprise
        setTimeout(() => {
          this.form.setFieldsValue(
        { id: record.id,
          name: record.name,
          address: record.address,
          enterprise_type: record.enterprise_type,
          employees: record.employees,
          area: record.area,
          profile: record.profile
          }
        )
      }, 100)
    },
    add () {
      this.visible = true
    },
    handleOk () {
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          UpdateEnDatas(values).then(res => {
            if (res.result) {
              this.$notification['success']({
        message: '通知',
        description:
          '修改成功！',
          duration: 1.5
      })
      this.$emit('refresh')
            }
          })
          this.form.resetFields()
          this.visible = false
        }
      })
    },
    handleCancel () {
      this.visible = false
    }
  }
}
</script>
