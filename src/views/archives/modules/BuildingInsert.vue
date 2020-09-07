<template>
  <a-modal
    title="增改楼栋信息"
    :visible="visible"
    :centered="true"
    :destroyOnClose="true"
    :confirm-loading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <a-card :bordered="false">
      <a-form :form="form" :label-col="{ span: 7 }" :wrapper-col="{ span: 17 }">
        <!-- <a-form-item label="楼栋编号" v-show="show">
          <a-input
            v-decorator="['buildingNo', { rules: [{ required: true, message: '请输入楼栋编号!' }] }]"
            disabled/>
        </a-form-item> -->
        <a-form-item label="楼栋名称">
          <a-input
            v-decorator="['buildingName', { rules: [{ required: true, message: '请输入楼栋名称!' }] }]"/>
        </a-form-item>
        <a-form-item label="楼栋地址">
          <a-input
            v-decorator="['buildingAddress', { rules: [{ required: true, message: '请输入楼栋地址!' }] }]"
          />
        </a-form-item>
        <a-form-item label="楼栋面积">
          <a-input-number
            :precision="0"
            :min="1"
            :max="100000"
            v-decorator="[ 'buildingArea',{rules: [{ required: true, message: '请输入楼栋面积' }]} ]"
            style="width:100%" />
        </a-form-item>
        <a-form-item label="楼栋层数">
          <a-input-number
            :precision="0"
            :min="1"
            :max="100000"
            v-decorator="[ 'floorCnt',{rules: [{ required: true, message: '请输入楼栋层数' }]} ]"
            style="width:100%" />
        </a-form-item>
        <a-form-item label="楼栋类型">
          <a-select
            v-decorator="[
              'building_category',
              { rules: [{ required: true, message: '请输入楼栋类型!' }] },
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
        <a-form-item label="建造时间">
          <a-date-picker
            v-decorator="['buildingTime', { rules: [{ type: 'object', required: true, message: '请输入建造时间!' }]}]"
            show-time
            format="YYYY-MM-DD"
            style="width:100%;"
          />
        </a-form-item>
      </a-form>
    </a-card>
  </a-modal>
</template>

<script>
import { getEnterpriseType, UpdateDatas, AddDatas } from '@/api/archives/enterprise'
import moment from 'moment'
export default {
  props: {
    buildings: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      visible: false,
      show: true,
      isAdd: null,
      id: null,
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
    edit (record) {
      this.visible = true
      this.show = true
      this.isAdd = false
      this.buildingNo = record.buildingNo
        setTimeout(() => {
          this.form.setFieldsValue(
        {
          // buildingNo: record.buildingNo,
          buildingAddress: record.buildingAddress,
          buildingArea: record.buildingArea,
          buildingName: record.buildingName,
          floorCnt: record.floorCnt,
          buildingTime: moment(record.buildingTime, 'YYYY-MM-DD'),
          building_category: record.building_category,
          employees: record.employees
          }
        )
      }, 100)
    },
    add (id) {
      this.visible = true
      this.show = false
      this.isAdd = true
      this.id = id
    },
    handleOk () {
      if (this.isAdd) {
         this.form.validateFields((err, values) => {
        if (!err) {
          values.enterpriseId = this.id
          values.buildingTime = values.buildingTime.format('YYYY-MM-DD')
          console.log('Received values of form: ', values)
          AddDatas(values).then(res => {
            if (res.result) {
              this.$notification['success']({
        message: '通知',
        description:
          '新增成功！',
          duration: 1.5
      })
      this.$emit('refresh')
            }
          })
          this.form.resetFields()
          this.visible = false
        }
      })
      } else {
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          values.buildingNo = this.buildingNo
          values.buildingTime = values.buildingTime.format('YYYY-MM-DD')
          UpdateDatas(values).then(res => {
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
      }
    },
    handleCancel () {
      this.visible = false
    }
  }
}
</script>
