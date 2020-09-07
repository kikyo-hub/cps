<template>
  <a-form :form="inline">
    <a-form-item
      label="房间号"
      :labelCol="{lg: {span: 7}, sm: {span: 7}}"
      :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
      <a-select
        name="roomNo"
        v-decorator="[
          'roomNo',
          { rules: [{ required: true, message: '请选择房间号' }] },
        ]"
      >
        <a-select-option v-for="(item,index) in diagnosisType" :key="item.no" :value="index">
          {{ item.title }}
        </a-select-option>
      </a-select>
    </a-form-item>
  </a-form>
</template>

<script>
export default {
    props: {
    record: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      parameter: {},
      diagnosisTypeOptions: [
        { key: '', val: '', display: '' }
      ],
      BuildingOptions: [
        { key: '', val: '', display: '' }
      ],
      diagnosisRuleOptions: [{ key: '', val: '', display: '' }],
      visible: false,
      form: this.$form.createForm(this),
      labelCol: { lg: { span: 7 }, sm: { span: 7 } },
      wrapperCol: { lg: { span: 10 }, sm: { span: 17 } }
    }
  },
  mounted () {
  },
  methods: {
    onCancel () {

    },
    handleSubmit () {
      const {
        form: { validateFields }
      } = this
      validateFields((errors, values) => {

      })
    }
  }
}
</script>
