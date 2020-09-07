<template>
  <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" @submit="handleSubmit">
    <a-form-item label="诊断对象">
      <a-select
        v-decorator="[
          'diagonsisArea',
          { initialValue: '0' },
          { rules: [{ required: true, message: '请选择诊断区域' }] },
        ]"
        @change="handleChange"
      >
        <a-select-option value="0">整个组织</a-select-option>
        <a-select-option value="1">自定义楼栋</a-select-option>
        <a-select-option value="2">自定义楼层</a-select-option>
        <a-select-option value="3">自定义房间</a-select-option>
        <a-select-option value="1">自定义区域</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="明细">
      <a-select
        v-decorator="[
          'gender',
          { rules: [{ required: true, message: 'Please select your gender!' }] },
        ]"
        placeholder="Select a option and change input text above"
        @change="handleSelectChange"
      >
        <a-select-option value="male">
          male
        </a-select-option>
        <a-select-option value="female">
          female
        </a-select-option>
      </a-select>
    </a-form-item>
  </a-form>
</template>
<script>
export default {
  methods: {
    handleChange (value) {
      console.log(`selected ${value}`)
    }
  }
}
</script>
